import { Pool } from 'pg';
import initialCategories from '@/data/categories_db.json';
import initialCourses from '@/data/courses_db.json';
import initialSchedules from '@/data/schedules_db.json';
import initialSiteSettings from '@/data/site_settings_db.json';

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
    return newCat;
  }
  return categoryData;
}

export async function deleteCategory(id) {
  await queryDb('DELETE FROM categories WHERE id=$1', [id]);
  memoryCategories = memoryCategories.filter(c => c.id !== parseInt(id));
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
    const idx = memoryCourses.findIndex(c => c.id === parseInt(id));
    if (idx !== -1) {
      memoryCourses[idx] = { ...memoryCourses[idx], ...courseData, id: parseInt(id) };
      return memoryCourses[idx];
    }
  } else {
    const newCourse = { ...courseData, id: Date.now() };
    memoryCourses.push(newCourse);
    return newCourse;
  }
  return courseData;
}

// Schedule helpers
export async function getSchedules() {
  const dbRes = await queryDb('SELECT * FROM schedules ORDER BY start_date ASC, id ASC');
  if (dbRes.success && dbRes.rows.length > 0) {
    return dbRes.rows;
  }
  return memorySchedules;
}

// Site Settings
export async function getSiteSettings() {
  return memorySiteSettings;
}

export async function saveSiteSettings(settings) {
  memorySiteSettings = { ...memorySiteSettings, ...settings };
  return memorySiteSettings;
}

// Leads
export async function getLeads() {
  const dbRes = await queryDb('SELECT * FROM leads ORDER BY created_at DESC');
  if (dbRes.success && dbRes.rows.length > 0) return dbRes.rows;
  return memoryLeads;
}

export async function saveLead(leadData) {
  const newLead = { ...leadData, id: Date.now(), created_at: new Date().toISOString() };
  memoryLeads.unshift(newLead);
  return newLead;
}

// Orders
export async function getOrders() {
  const dbRes = await queryDb('SELECT * FROM orders ORDER BY created_at DESC');
  if (dbRes.success && dbRes.rows.length > 0) return dbRes.rows;
  return memoryOrders;
}

// Users
export async function getUsers() {
  const dbRes = await queryDb('SELECT id, name, email, role, is_active FROM users ORDER BY id ASC');
  if (dbRes.success && dbRes.rows.length > 0) return dbRes.rows;
  return memoryUsers;
}
