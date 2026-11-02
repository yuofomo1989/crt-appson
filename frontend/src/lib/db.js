import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';
import initialCategories from '@/data/categories_db.json';
import initialCourses from '@/data/courses_db.json';
import initialSchedules from '@/data/schedules_db.json';
import initialSiteSettings from '@/data/site_settings_db.json';

function getDbFilePath(filename) {
  const possibleDirs = [
    path.join(process.cwd(), 'src', 'data'),
    path.join(process.cwd(), 'frontend', 'src', 'data'),
  ];
  for (const d of possibleDirs) {
    const full = path.join(d, filename);
    if (fs.existsSync(full)) return full;
  }
  const targetDir = possibleDirs[0];
  if (!fs.existsSync(targetDir)) {
    try { fs.mkdirSync(targetDir, { recursive: true }); } catch (e) {}
  }
  return path.join(targetDir, filename);
}

let pool = null;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST || 'aws-0-ap-northeast-1.pooler.supabase.com',
      port: parseInt(process.env.DB_PORT || '5432'),
      user: process.env.DB_USERNAME || 'postgres.kixrcjitfoqyvqjvrpaa',
      password: process.env.DB_PASSWORD || 'CpAdmin@2026!',
      database: process.env.DB_DATABASE || 'postgres',
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 3500,
      max: 10,
      idleTimeoutMillis: 10000,
    });

    pool.on('error', (err) => {
      console.warn('[Supabase PG Pool warning]:', err.message);
    });
  }
  return pool;
}

// In-memory fallback stores for when DB is paused or unreachable
let memoryCategories = [...initialCategories];
let memoryCourses = [...initialCourses];
let memorySchedules = [...initialSchedules];
let memorySiteSettings = { ...initialSiteSettings };
let memoryLeads = [
  { id: 1, name: "David Miller", email: "david.miller@example.com", phone: "+1 555-019-2831", course: "PMP® Certification Training", training_format: "Live Online Classroom", status: "new", created_at: new Date().toISOString() },
  { id: 2, name: "Sarah Jenkins", email: "sarah.j@techcorp.io", phone: "+1 555-883-9102", course: "CISSP® Exam Prep Bootcamp", training_format: "Bootcamp (4 Days)", status: "contacted", created_at: new Date().toISOString() }
];
let memoryOrders = [
  { id: 1, order_number: "CP-2026-9842", customer_name: "Alex Reynolds", customer_email: "alex.reynolds@example.com", course_title: "PMP® Certification", amount: 1895, payment_status: "completed", payment_method: "Credit Card (Stripe)", created_at: new Date().toISOString() }
];
let memoryUsers = [
  { id: 1, name: "Super Administrator", email: "admin@certificationplanner.com", role: "Super Admin", is_active: true }
];

export async function queryDb(sql, params = []) {
  try {
    const p = getPool();
    const res = await p.query(sql, params);
    return { success: true, rows: res.rows, rowCount: res.rowCount };
  } catch (err) {
    console.warn('[DB Query Notice - Using Fallback Storage]:', err.message);
    return { success: false, error: err.message, rows: [] };
  }
}

// Category helpers
export async function getCategories() {
  const dbRes = await queryDb('SELECT * FROM categories ORDER BY display_order ASC, id ASC');
  if (dbRes.success && dbRes.rows.length > 0) {
    return dbRes.rows.map(c => {
      let meta = c.metadata;
      if (typeof meta === 'string') {
        try { meta = JSON.parse(meta); } catch (e) { meta = {}; }
      }
      return { ...c, metadata: meta || {} };
    });
  }
  return memoryCategories;
}

export async function saveCategory(categoryData, id = null) {
  const metaJson = JSON.stringify(categoryData.metadata || {});
  if (id) {
    // Try updating DB
    const dbRes = await queryDb(
      `UPDATE categories SET name=$1, slug=$2, description=$3, display_order=$4, is_featured=$5, avg_salary=$6, badge_text=$7, image=$8, bg_image=$9, metadata=$10, updated_at=NOW() WHERE id=$11 RETURNING *`,
      [
        categoryData.name,
        categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        categoryData.description || '',
        categoryData.display_order ?? 0,
        categoryData.is_featured ? 1 : 0,
        categoryData.avg_salary || '$115,000',
        categoryData.badge_text || 'High Demand',
        categoryData.image || '',
        categoryData.bg_image || '',
        metaJson,
        id
      ]
    );
    if (dbRes.success && dbRes.rows.length > 0) {
      return dbRes.rows[0];
    }
    // Memory fallback update
    const idx = memoryCategories.findIndex(c => c.id === parseInt(id));
    if (idx !== -1) {
      memoryCategories[idx] = { ...memoryCategories[idx], ...categoryData, id: parseInt(id) };
      try {
        fs.writeFileSync(getDbFilePath('categories_db.json'), JSON.stringify(memoryCategories, null, 2), 'utf-8');
      } catch (e) {}
      return memoryCategories[idx];
    }
  } else {
    // Insert new
    const slug = categoryData.slug || categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const dbRes = await queryDb(
      `INSERT INTO categories (name, slug, description, display_order, is_featured, avg_salary, badge_text, image, bg_image, metadata, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW(), NOW()) RETURNING *`,
      [
        categoryData.name,
        slug,
        categoryData.description || '',
        categoryData.display_order ?? 0,
        categoryData.is_featured ? 1 : 0,
        categoryData.avg_salary || '$115,000',
        categoryData.badge_text || 'High Demand',
        categoryData.image || '',
        categoryData.bg_image || '',
        metaJson
      ]
    );
    if (dbRes.success && dbRes.rows.length > 0) {
      return dbRes.rows[0];
    }
    const newCat = {
      ...categoryData,
      id: Date.now(),
      slug,
      display_order: categoryData.display_order ?? 0,
      is_featured: categoryData.is_featured ?? 1
    };
    memoryCategories.push(newCat);
    try {
      fs.writeFileSync(getDbFilePath('categories_db.json'), JSON.stringify(memoryCategories, null, 2), 'utf-8');
    } catch (e) {}
    return newCat;
  }
  return categoryData;
}

export async function deleteCategory(id) {
  await queryDb('DELETE FROM categories WHERE id=$1', [id]);
  memoryCategories = memoryCategories.filter(c => c.id !== parseInt(id));
  try {
    fs.writeFileSync(getDbFilePath('categories_db.json'), JSON.stringify(memoryCategories, null, 2), 'utf-8');
  } catch (e) {}
  return true;
}

// Course helpers
export async function getCourses() {
  const dbRes = await queryDb('SELECT * FROM courses ORDER BY id ASC');
  if (dbRes.success && dbRes.rows.length > 0) {
    return dbRes.rows;
  }
  return memoryCourses;
}

export async function saveCourse(courseData, id = null) {
  if (id) {
    const idx = memoryCourses.findIndex(c => String(c.id) === String(id) || c.slug === String(id));
    if (idx !== -1) {
      memoryCourses[idx] = { ...memoryCourses[idx], ...courseData, id: memoryCourses[idx].id };
      try {
        fs.writeFileSync(getDbFilePath('courses_db.json'), JSON.stringify(memoryCourses, null, 2), 'utf-8');
      } catch (e) {}
      return memoryCourses[idx];
    }
  } else {
    const newCourse = { ...courseData, id: Date.now() };
    memoryCourses.push(newCourse);
    try {
      fs.writeFileSync(getDbFilePath('courses_db.json'), JSON.stringify(memoryCourses, null, 2), 'utf-8');
    } catch (e) {}
    return newCourse;
  }
  return courseData;
}

export async function deleteCourse(id) {
  await queryDb('DELETE FROM courses WHERE id=$1', [id]);
  const initialLen = memoryCourses.length;
  memoryCourses = memoryCourses.filter(c => String(c.id) !== String(id) && c.slug !== String(id));
  if (memoryCourses.length !== initialLen) {
    try {
      fs.writeFileSync(getDbFilePath('courses_db.json'), JSON.stringify(memoryCourses, null, 2), 'utf-8');
    } catch (e) {}
    return true;
  }
  return false;
}

// Schedule helpers
export async function getSchedules() {
  const dbRes = await queryDb('SELECT * FROM schedules ORDER BY start_date ASC, id ASC');
  if (dbRes.success && dbRes.rows.length > 0) {
    return dbRes.rows;
  }
  try {
    const filePath = getDbFilePath('schedules_db.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memorySchedules = parsed;
      }
    }
  } catch (e) {}
  return memorySchedules;
}

export async function saveSchedule(scheduleData, id = null) {
  if (id) {
    const idx = memorySchedules.findIndex(s => s.id === parseInt(id));
    if (idx !== -1) {
      memorySchedules[idx] = { ...memorySchedules[idx], ...scheduleData, id: parseInt(id) };
      try {
        fs.writeFileSync(getDbFilePath('schedules_db.json'), JSON.stringify(memorySchedules, null, 2), 'utf-8');
      } catch (e) {}
      return memorySchedules[idx];
    }
  } else {
    const newSchedule = { ...scheduleData, id: Date.now() };
    memorySchedules.unshift(newSchedule);
    try {
      fs.writeFileSync(getDbFilePath('schedules_db.json'), JSON.stringify(memorySchedules, null, 2), 'utf-8');
    } catch (e) {}
    return newSchedule;
  }
  return scheduleData;
}

export async function deleteSchedule(id) {
  memorySchedules = memorySchedules.filter(s => s.id !== parseInt(id));
  try {
    fs.writeFileSync(getDbFilePath('schedules_db.json'), JSON.stringify(memorySchedules, null, 2), 'utf-8');
  } catch (e) {}
  return true;
}

// Site Settings
export async function getSiteSettings() {
  try {
    const filePath = getDbFilePath('site_settings_db.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      memorySiteSettings = { ...initialSiteSettings, ...memorySiteSettings, ...parsed };
    }
  } catch (err) {
    console.warn('[getSiteSettings read warning]:', err.message);
  }
  return memorySiteSettings;
}

export async function saveSiteSettings(settings) {
  memorySiteSettings = { ...memorySiteSettings, ...settings };
  try {
    const filePath = getDbFilePath('site_settings_db.json');
    fs.writeFileSync(filePath, JSON.stringify(memorySiteSettings, null, 4), 'utf-8');
    console.log('[saveSiteSettings] Persisted updated site settings to disk:', filePath);
  } catch (err) {
    console.warn('[saveSiteSettings write warning]:', err.message);
  }
  return memorySiteSettings;
}

// Leads
let memoryLeadsLoaded = false;
export async function getLeads() {
  const dbRes = await queryDb('SELECT * FROM leads ORDER BY created_at DESC');
  if (dbRes.success && dbRes.rows.length > 0) return dbRes.rows;
  if (!memoryLeadsLoaded) {
    try {
      const filePath = getDbFilePath('leads_db.json');
      if (fs.existsSync(filePath)) {
        memoryLeads = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        memoryLeadsLoaded = true;
      }
    } catch (e) {}
  }
  return memoryLeads;
}

export async function saveLead(leadData) {
  const leads = await getLeads();
  const newLead = { ...leadData, id: Date.now(), created_at: new Date().toISOString() };
  leads.unshift(newLead);
  memoryLeads = leads;
  try {
    fs.writeFileSync(getDbFilePath('leads_db.json'), JSON.stringify(leads, null, 2), 'utf-8');
  } catch (e) {}
  return newLead;
}

export async function updateLeadStatus(id, newStatus, notes = null) {
  const leads = await getLeads();
  const lead = leads.find(l => String(l.id) === String(id));
  if (lead) {
    if (newStatus !== undefined && newStatus !== null) lead.status = newStatus;
    if (notes !== undefined && notes !== null) lead.notes = notes;
    lead.updated_at = new Date().toISOString();
    try {
      fs.writeFileSync(getDbFilePath('leads_db.json'), JSON.stringify(leads, null, 2), 'utf-8');
    } catch (e) {}
    return lead;
  }
  return null;
}

export async function deleteLead(id) {
  let leads = await getLeads();
  const initialLen = leads.length;
  leads = leads.filter(l => String(l.id) !== String(id));
  memoryLeads = leads;
  if (leads.length !== initialLen) {
    try {
      fs.writeFileSync(getDbFilePath('leads_db.json'), JSON.stringify(leads, null, 2), 'utf-8');
    } catch (e) {}
    return true;
  }
  return false;
}

// Orders
let memoryOrdersLoaded = false;
export async function getOrders() {
  const dbRes = await queryDb('SELECT * FROM orders ORDER BY created_at DESC');
  if (dbRes.success && dbRes.rows.length > 0) return dbRes.rows;
  if (!memoryOrdersLoaded) {
    try {
      const filePath = getDbFilePath('orders_db.json');
      if (fs.existsSync(filePath)) {
        memoryOrders = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        memoryOrdersLoaded = true;
      }
    } catch (e) {}
  }
  return memoryOrders;
}

export async function saveOrder(orderData) {
  const orders = await getOrders();
  const newOrder = {
    id: Date.now(),
    order_number: orderData.order_number || `CP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    customer_name: orderData.customer_name || orderData.full_name || 'Student',
    customer_email: orderData.customer_email || orderData.email || '',
    customer_phone: orderData.customer_phone || orderData.phone || '',
    course_title: orderData.course_title || orderData.course || 'Certification Training',
    format: orderData.format || 'Live Online Classroom',
    amount: orderData.amount || orderData.price || 0,
    payment_status: orderData.payment_status || 'completed',
    payment_method: orderData.payment_method || 'Credit Card',
    created_at: new Date().toISOString()
  };
  orders.unshift(newOrder);
  memoryOrders = orders;
  try {
    fs.writeFileSync(getDbFilePath('orders_db.json'), JSON.stringify(orders, null, 2), 'utf-8');
  } catch (e) {}
  return newOrder;
}

export async function updateOrderStatus(id, newStatus) {
  const orders = await getOrders();
  const order = orders.find(o => String(o.id) === String(id) || o.order_number === String(id));
  if (order) {
    order.payment_status = newStatus;
    order.updated_at = new Date().toISOString();
    try {
      fs.writeFileSync(getDbFilePath('orders_db.json'), JSON.stringify(orders, null, 2), 'utf-8');
    } catch (e) {}
    return order;
  }
  return null;
}

export async function deleteOrder(id) {
  let orders = await getOrders();
  const initialLen = orders.length;
  orders = orders.filter(o => String(o.id) !== String(id) && o.order_number !== String(id));
  memoryOrders = orders;
  if (orders.length !== initialLen) {
    try {
      fs.writeFileSync(getDbFilePath('orders_db.json'), JSON.stringify(orders, null, 2), 'utf-8');
    } catch (e) {}
    return true;
  }
  return false;
}

// Users
let memoryUsersLoaded = false;
export async function getUsers() {
  const dbRes = await queryDb('SELECT id, name, email, role, is_active FROM users ORDER BY id ASC');
  if (dbRes.success && dbRes.rows.length > 0) return dbRes.rows;
  if (!memoryUsersLoaded) {
    try {
      const filePath = getDbFilePath('users_db.json');
      if (fs.existsSync(filePath)) {
        memoryUsers = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        memoryUsersLoaded = true;
      }
    } catch (e) {}
  }
  return memoryUsers;
}

export async function saveUser(userData, id = null) {
  const users = await getUsers();
  if (id) {
    const idx = users.findIndex(u => String(u.id) === String(id));
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...userData, id: users[idx].id };
      try {
        fs.writeFileSync(getDbFilePath('users_db.json'), JSON.stringify(users, null, 2), 'utf-8');
      } catch (e) {}
      return users[idx];
    }
  } else {
    const newId = users.reduce((max, u) => Math.max(max, typeof u.id === 'number' ? u.id : 0), 0) + 1;
    const newUser = { ...userData, id: newId, is_active: true, created_at: new Date().toISOString() };
    users.push(newUser);
    memoryUsers = users;
    try {
      fs.writeFileSync(getDbFilePath('users_db.json'), JSON.stringify(users, null, 2), 'utf-8');
    } catch (e) {}
    return newUser;
  }
  return userData;
}

export async function toggleUserStatus(id) {
  const users = await getUsers();
  const user = users.find(u => String(u.id) === String(id));
  if (user) {
    user.is_active = !user.is_active;
    try {
      fs.writeFileSync(getDbFilePath('users_db.json'), JSON.stringify(users, null, 2), 'utf-8');
    } catch (e) {}
    return user;
  }
  return null;
}

export async function changeUserPassword(id, newPassword) {
  const users = await getUsers();
  const user = users.find(u => String(u.id) === String(id));
  if (user) {
    user.password_updated_at = new Date().toISOString();
    try {
      fs.writeFileSync(getDbFilePath('users_db.json'), JSON.stringify(users, null, 2), 'utf-8');
    } catch (e) {}
    return true;
  }
  return false;
}

export async function deleteUser(id) {
  let users = await getUsers();
  const initialLen = users.length;
  users = users.filter(u => String(u.id) !== String(id));
  memoryUsers = users;
  if (users.length !== initialLen) {
    try {
      fs.writeFileSync(getDbFilePath('users_db.json'), JSON.stringify(users, null, 2), 'utf-8');
    } catch (e) {}
    return true;
  }
  return false;
}

// Support Tickets Helpers
let memoryTickets = null;
export async function getSupportTickets() {
  if (memoryTickets && memoryTickets.length > 0) return memoryTickets;
  try {
    const filePath = getDbFilePath('support_tickets_db.json');
    if (fs.existsSync(filePath)) {
      memoryTickets = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return memoryTickets;
    }
  } catch (e) {}
  return memoryTickets || [];
}

export async function updateTicketStatus(id, newStatus) {
  const tickets = await getSupportTickets();
  const t = tickets.find(x => String(x.id) === String(id));
  if (t) {
    t.status = newStatus;
    t.updated_at = new Date().toISOString();
    try {
      fs.writeFileSync(getDbFilePath('support_tickets_db.json'), JSON.stringify(tickets, null, 2), 'utf-8');
    } catch (e) {}
    return t;
  }
  return null;
}

export async function addTicketNote(id, note) {
  const tickets = await getSupportTickets();
  const t = tickets.find(x => String(x.id) === String(id));
  if (t) {
    t.admin_notes = note;
    try {
      fs.writeFileSync(getDbFilePath('support_tickets_db.json'), JSON.stringify(tickets, null, 2), 'utf-8');
    } catch (e) {}
    return t;
  }
  return null;
}

export async function addTicketReply(id, replyObj) {
  const tickets = await getSupportTickets();
  const t = tickets.find(x => String(x.id) === String(id));
  if (t) {
    if (!Array.isArray(t.messages)) t.messages = [];
    t.messages.push({
      id: t.messages.length + 1,
      sender: replyObj.sender || 'support',
      sender_name: replyObj.sender_name || 'Support Team',
      message: replyObj.message || '',
      created_at: new Date().toISOString()
    });
    try {
      fs.writeFileSync(getDbFilePath('support_tickets_db.json'), JSON.stringify(tickets, null, 2), 'utf-8');
    } catch (e) {}
    return t;
  }
  return null;
}

export async function deleteTicket(id) {
  let tickets = await getSupportTickets();
  const initialLen = tickets.length;
  tickets = tickets.filter(t => String(t.id) !== String(id));
  memoryTickets = tickets;
  if (tickets.length !== initialLen) {
    try {
      fs.writeFileSync(getDbFilePath('support_tickets_db.json'), JSON.stringify(tickets, null, 2), 'utf-8');
    } catch (e) {}
    return true;
  }
  return false;
}

// Coupons Helpers
let memoryCoupons = null;
export async function getCoupons() {
  if (memoryCoupons && memoryCoupons.length > 0) return memoryCoupons;
  try {
    const filePath = getDbFilePath('coupons_db.json');
    if (fs.existsSync(filePath)) {
      memoryCoupons = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return memoryCoupons;
    }
  } catch (e) {}
  return memoryCoupons || [];
}

export async function saveCoupon(couponData) {
  const coupons = await getCoupons();
  const newCoupon = {
    id: coupons.length + 1,
    code: (couponData.code || '').trim().toUpperCase(),
    discount_type: couponData.discount_type || couponData.type || 'percentage',
    discount_value: Number(couponData.discount_value || couponData.value || 10),
    valid_until: couponData.valid_until || couponData.valid_till || '2026-12-31',
    is_active: true
  };
  coupons.push(newCoupon);
  memoryCoupons = coupons;
  try {
    fs.writeFileSync(getDbFilePath('coupons_db.json'), JSON.stringify(coupons, null, 2), 'utf-8');
  } catch (e) {}
  return newCoupon;
}

export async function deleteCoupon(id) {
  let coupons = await getCoupons();
  const initialLen = coupons.length;
  coupons = coupons.filter(c => String(c.id) !== String(id) && c.code !== String(id));
  memoryCoupons = coupons;
  if (coupons.length !== initialLen) {
    try {
      fs.writeFileSync(getDbFilePath('coupons_db.json'), JSON.stringify(coupons, null, 2), 'utf-8');
    } catch (e) {}
    return true;
  }
  return false;
}

// Brochures Helpers
let memoryBrochures = null;
export async function getBrochures() {
  if (memoryBrochures && memoryBrochures.length > 0) return memoryBrochures;
  try {
    const filePath = getDbFilePath('brochures_db.json');
    if (fs.existsSync(filePath)) {
      memoryBrochures = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return memoryBrochures;
    }
  } catch (e) {}
  return memoryBrochures || [];
}

export async function saveBrochure(brochureData) {
  const brochures = await getBrochures();
  const newBrochure = {
    id: brochures.length + 1,
    course_id: brochureData.course_id || 1,
    course_title: brochureData.course_title || 'Certification Training',
    document_title: brochureData.document_title || 'Course Document',
    file_url: brochureData.file_url || '',
    file_type: brochureData.file_type || 'pdf',
    file_size: brochureData.file_size || '2.0 MB',
    created_at: new Date().toISOString()
  };
  brochures.push(newBrochure);
  memoryBrochures = brochures;
  try {
    fs.writeFileSync(getDbFilePath('brochures_db.json'), JSON.stringify(brochures, null, 2), 'utf-8');
  } catch (e) {}
  return newBrochure;
}

export async function deleteBrochure(id) {
  let brochures = await getBrochures();
  const initialLen = brochures.length;
  brochures = brochures.filter(b => String(b.id) !== String(id));
  memoryBrochures = brochures;
  if (brochures.length !== initialLen) {
    try {
      fs.writeFileSync(getDbFilePath('brochures_db.json'), JSON.stringify(brochures, null, 2), 'utf-8');
    } catch (e) {}
    return true;
  }
  return false;
}

// Articles / Blog Helpers
let memoryArticles = null;
let memoryArticleCategories = null;

export async function getArticles() {
  if (memoryArticles && memoryArticles.length > 0) {
    return memoryArticles;
  }
  try {
    const filePath = getDbFilePath('articles_db.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryArticles = parsed;
        return memoryArticles;
      }
    }
  } catch (err) {
    console.warn('[getArticles read warning]:', err.message);
  }
  return memoryArticles || [];
}

export async function getArticleById(id) {
  const articles = await getArticles();
  return articles.find(a => String(a.id) === String(id) || a.slug === id) || null;
}

export async function saveArticle(articleData, id = null) {
  const articles = await getArticles();
  const slug = articleData.slug || (articleData.title ? articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `article-${Date.now()}`);
  
  if (id) {
    const idx = articles.findIndex(a => String(a.id) === String(id) || a.slug === String(id));
    if (idx !== -1) {
      articles[idx] = {
        ...articles[idx],
        ...articleData,
        slug: articleData.slug || articles[idx].slug || slug,
        updated_at: new Date().toISOString()
      };
      try {
        const filePath = getDbFilePath('articles_db.json');
        fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf-8');
      } catch (e) {
        console.warn('[saveArticle write error]:', e.message);
      }
      return articles[idx];
    }
  }

  // New Article
  const newId = articles.reduce((max, a) => Math.max(max, typeof a.id === 'number' ? a.id : 0), 0) + 1;
  const newArticle = {
    id: newId,
    title: articleData.title || '',
    slug: slug,
    category_name: articleData.category_name || 'General',
    category_slug: articleData.category_slug || (articleData.category_name || 'General').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    author: articleData.author || 'Certification Planner Editorial',
    image: articleData.image || '/article_green_project_hero.jpg',
    tag: articleData.tag || articleData.tags || 'Certification',
    views: articleData.views || 0,
    description: articleData.description || '',
    content: articleData.content || '',
    plain_text: articleData.plain_text || articleData.description || '',
    is_featured: Boolean(articleData.is_featured),
    created_at: articleData.created_at || new Date().toISOString(),
    seo: {
      meta_title: articleData.meta_title || articleData.title || '',
      meta_description: articleData.meta_description || articleData.description || '',
      meta_keywords: articleData.meta_keywords || ''
    }
  };

  articles.unshift(newArticle);
  memoryArticles = articles;
  try {
    const filePath = getDbFilePath('articles_db.json');
    fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf-8');
  } catch (e) {
    console.warn('[saveArticle write error]:', e.message);
  }
  return newArticle;
}

export async function deleteArticle(id) {
  let articles = await getArticles();
  const initialLen = articles.length;
  articles = articles.filter(a => String(a.id) !== String(id) && a.slug !== String(id));
  memoryArticles = articles;
  if (articles.length !== initialLen) {
    try {
      const filePath = getDbFilePath('articles_db.json');
      fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), 'utf-8');
    } catch (e) {
      console.warn('[deleteArticle write error]:', e.message);
    }
    return true;
  }
  return false;
}

// Article Categories Helpers
export async function getArticleCategories() {
  if (memoryArticleCategories && memoryArticleCategories.length > 0) {
    return memoryArticleCategories;
  }
  const articles = await getArticles();
  const catMap = new Map();
  articles.forEach(a => {
    if (a.category_name && !catMap.has(a.category_name.trim())) {
      catMap.set(a.category_name.trim(), {
        id: catMap.size + 1,
        name: a.category_name.trim(),
        slug: a.category_slug || a.category_name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: `Guides, articles, and insights on ${a.category_name.trim()}`,
        icon_type: 'green'
      });
    }
  });
  memoryArticleCategories = Array.from(catMap.values());
  return memoryArticleCategories;
}

export async function saveArticleCategory(catData) {
  const categories = await getArticleCategories();
  const newCat = {
    id: categories.length + 1,
    name: catData.name.trim(),
    slug: catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    description: catData.description || `Guides and articles on ${catData.name.trim()}`,
    icon_type: catData.icon_type || 'green'
  };
  categories.push(newCat);
  memoryArticleCategories = categories;
  return newCat;
}

export async function deleteArticleCategory(id) {
  let categories = await getArticleCategories();
  memoryArticleCategories = categories.filter(c => String(c.id) !== String(id));
  return true;
}

// Testimonials Helpers
let memoryTestimonials = null;

export async function getTestimonials() {
  if (memoryTestimonials && memoryTestimonials.length > 0) {
    return memoryTestimonials;
  }
  try {
    const filePath = getDbFilePath('testimonials_db.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryTestimonials = parsed;
        return memoryTestimonials;
      }
    }
  } catch (err) {
    console.warn('[getTestimonials read warning]:', err.message);
  }
  return memoryTestimonials || [];
}

export async function saveTestimonial(testimonialData, id = null) {
  const testimonials = await getTestimonials();
  if (id) {
    const idx = testimonials.findIndex(t => String(t.id) === String(id));
    if (idx !== -1) {
      testimonials[idx] = { ...testimonials[idx], ...testimonialData, id: parseInt(id) };
      try {
        const filePath = getDbFilePath('testimonials_db.json');
        fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2), 'utf-8');
      } catch (e) {}
      return testimonials[idx];
    }
  } else {
    const newId = testimonials.reduce((max, t) => Math.max(max, typeof t.id === 'number' ? t.id : 0), 0) + 1;
    const newTestimonial = { ...testimonialData, id: newId, created_at: new Date().toISOString() };
    testimonials.unshift(newTestimonial);
    memoryTestimonials = testimonials;
    try {
      const filePath = getDbFilePath('testimonials_db.json');
      fs.writeFileSync(filePath, JSON.stringify(testimonials, null, 2), 'utf-8');
    } catch (e) {}
    return newTestimonial;
  }
  return testimonialData;
}

export async function deleteTestimonial(id) {
  let testimonials = await getTestimonials();
  memoryTestimonials = testimonials.filter(t => String(t.id) !== String(id));
  try {
    const filePath = getDbFilePath('testimonials_db.json');
    fs.writeFileSync(filePath, JSON.stringify(memoryTestimonials, null, 2), 'utf-8');
  } catch (e) {}
  return true;
}

// Marketing Popups Helpers
let memoryPopups = null;

export async function getPopups() {
  if (memoryPopups && memoryPopups.length > 0) return memoryPopups;
  try {
    const filePath = getDbFilePath('popups_db.json');
    if (fs.existsSync(filePath)) {
      memoryPopups = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      return memoryPopups;
    }
  } catch (e) {}
  return memoryPopups || [];
}

export async function savePopup(popupData, id = null) {
  const popups = await getPopups();
  if (id) {
    const idx = popups.findIndex(p => String(p.id) === String(id));
    if (idx !== -1) {
      popups[idx] = {
        ...popups[idx],
        ...popupData,
        id: popups[idx].id,
        updated_at: new Date().toISOString()
      };
      try {
        const filePath = getDbFilePath('popups_db.json');
        fs.writeFileSync(filePath, JSON.stringify(popups, null, 2), 'utf-8');
      } catch (e) {}
      return popups[idx];
    }
  } else {
    const newId = popups.reduce((max, p) => Math.max(max, typeof p.id === 'number' ? p.id : 0), 0) + 1;
    const newPopup = {
      id: newId,
      name: popupData.name || 'New Campaign',
      title: popupData.title || '',
      subtitle: popupData.subtitle || '',
      coupon_code: popupData.coupon_code || 'SAVE10',
      cta_text: popupData.cta_text || 'Claim Free Consultation & Offer',
      trigger_type: popupData.trigger_type || 'delay',
      delay_seconds: Number(popupData.delay_seconds || 3),
      target_type: popupData.target_type || 'all',
      target_course_ids: popupData.target_course_ids || [],
      target_category_names: popupData.target_category_names || [],
      theme_color: popupData.theme_color || 'navy',
      banner_image: popupData.banner_image || '',
      status: popupData.status || 'active',
      created_at: new Date().toISOString()
    };
    popups.unshift(newPopup);
    memoryPopups = popups;
    try {
      const filePath = getDbFilePath('popups_db.json');
      fs.writeFileSync(filePath, JSON.stringify(popups, null, 2), 'utf-8');
    } catch (e) {}
    return newPopup;
  }
  return popupData;
}

export async function deletePopup(id) {
  let popups = await getPopups();
  const initialLen = popups.length;
  popups = popups.filter(p => String(p.id) !== String(id));
  memoryPopups = popups;
  if (popups.length !== initialLen) {
    try {
      const filePath = getDbFilePath('popups_db.json');
      fs.writeFileSync(filePath, JSON.stringify(memoryPopups, null, 2), 'utf-8');
    } catch (e) {}
    return true;
  }
  return false;
}

export async function getChatTicketById(ticketIdentifier) {
  const tickets = await getSupportTickets();
  const t = tickets.find(x => String(x.id) === String(ticketIdentifier) || String(x.ticket_number) === String(ticketIdentifier));
  return t || null;
}

export async function createOrAppendChatTicket({ ticketId, name, email, phone, message, course_title, page_url, sender, sender_name }) {
  let tickets = await getSupportTickets();
  let existingTicket = null;
  if (ticketId) {
    existingTicket = tickets.find(x => String(x.id) === String(ticketId) || String(x.ticket_number) === String(ticketId));
  }

  const now = new Date().toISOString();

  if (existingTicket) {
    if (!Array.isArray(existingTicket.messages)) existingTicket.messages = [];
    existingTicket.messages.push({
      id: existingTicket.messages.length + 1,
      sender: sender || 'student',
      sender_name: sender_name || name || existingTicket.name || 'Visitor',
      message: message,
      created_at: now
    });
    existingTicket.updated_at = now;
    if (name && !existingTicket.name) existingTicket.name = name;
    if (email && !existingTicket.email) existingTicket.email = email;
    if (phone && !existingTicket.phone) existingTicket.phone = phone;

    try {
      const dbPath = getDbFilePath('support_tickets_db.json');
      fs.writeFileSync(dbPath, JSON.stringify(tickets, null, 2), 'utf-8');
    } catch (e) {}

    return existingTicket;
  } else {
    const newId = Date.now();
    const ticketNumber = 'CHAT-' + Math.floor(10000 + Math.random() * 90000);
    const newTicket = {
      id: newId,
      ticket_number: ticketNumber,
      name: name || 'Website Visitor',
      email: email || '',
      phone: phone || '',
      subject: `Live Chat: ${course_title || 'General Advisor Inquiry'}`,
      request_type: 'Live Chat Inquiry',
      status: 'open',
      priority: 'high',
      course_title: course_title || 'General Training',
      source_page: page_url || '/',
      created_at: now,
      updated_at: now,
      messages: [
        {
          id: 1,
          sender: sender || 'student',
          sender_name: sender_name || name || 'Visitor',
          message: message,
          created_at: now
        },
        {
          id: 2,
          sender: 'support',
          sender_name: 'Sarah Mitchell (Advisor)',
          message: `Hello! 👋 Thank you for connecting with Certification Planner. I have noted your inquiry regarding "${course_title || 'training programs'}". Our senior advisor is reviewing your request right now. You can also reach our direct advisory line at +1-855-322-1201.`,
          created_at: new Date(Date.now() + 1000).toISOString()
        }
      ]
    };

    tickets.unshift(newTicket);
    try {
      const dbPath = getDbFilePath('support_tickets_db.json');
      fs.writeFileSync(dbPath, JSON.stringify(tickets, null, 2), 'utf-8');
    } catch (e) {}

    try {
      await saveLead({
        id: Date.now(),
        name: name || 'Live Chat Visitor',
        email: email || 'pending-chat@inquiry.com',
        phone: phone || '',
        course_name: course_title || 'General Inquiry',
        inquiry_type: 'Live Chat Inquiry',
        source: 'Live Chat Widget',
        status: 'new',
        priority: 'high',
        notes: `Chat initiated from ${page_url || '/'}. First query: "${message}"`,
        created_at: now
      });
    } catch (e) {
      console.error('Failed to create lead from chat:', e);
    }

    return newTicket;
  }
}
