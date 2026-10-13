import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getSiteSettings, saveSiteSettings } from '@/lib/db';

export async function GET() {
  try {
    const mediaList = [];
    const publicDir = path.join(process.cwd(), 'public');
    const uploadsDir = path.join(publicDir, 'uploads');
    const imagesDir = path.join(publicDir, 'images');

    // 1. Scan uploads directory
    if (fs.existsSync(uploadsDir)) {
      const uploadFiles = fs.readdirSync(uploadsDir);
      for (const file of uploadFiles) {
        const fullPath = path.join(uploadsDir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isFile() && /\.(png|jpe?g|webp|svg|gif)$/i.test(file)) {
          mediaList.push({
            id: 'up_' + file,
            name: file,
            url: `/uploads/${file}`,
            size: `${(stat.size / 1024).toFixed(1)} KB`,
            uploaded_at: stat.mtime.toISOString(),
            is_hero: false,
          });
        }
      }
    }

    // 2. Scan images directory
    if (fs.existsSync(imagesDir)) {
      const imgFiles = fs.readdirSync(imagesDir);
      for (const file of imgFiles) {
        const fullPath = path.join(imagesDir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isFile() && /\.(png|jpe?g|webp|svg|gif)$/i.test(file)) {
          mediaList.push({
            id: 'img_' + file,
            name: file,
            url: `/images/${file}`,
            size: `${(stat.size / 1024).toFixed(1)} KB`,
            uploaded_at: stat.mtime.toISOString(),
            is_hero: file.includes('hero'),
          });
        }
      }
    }

    // Sort newest first
    mediaList.sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at));

    return NextResponse.json({ status: 'success', data: mediaList });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const setAsHero = formData.get('set_as_hero') === 'true';

    if (!file || typeof file === 'string') {
      return NextResponse.json({ status: 'error', message: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Clean filename
    const originalName = file.name || 'image.png';
    const ext = path.extname(originalName).toLowerCase() || '.png';
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFileName = `${baseName}_${Date.now()}${ext}`;

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, uniqueFileName);
    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/uploads/${uniqueFileName}`;

    // If marked as hero, auto update site settings
    if (setAsHero) {
      const currentSettings = await getSiteSettings();
      await saveSiteSettings({ ...currentSettings, hero_image_url: fileUrl });
    }

    return NextResponse.json({
      status: 'success',
      message: 'Image uploaded successfully to Media Library',
      data: {
        id: 'up_' + uniqueFileName,
        name: uniqueFileName,
        url: fileUrl,
        size: `${(buffer.length / 1024).toFixed(1)} KB`,
        uploaded_at: new Date().toISOString(),
        is_hero: setAsHero
      }
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const fileName = searchParams.get('filename');

    if (!fileName) {
      return NextResponse.json({ status: 'error', message: 'Filename required' }, { status: 400 });
    }

    const safeName = path.basename(fileName);
    const filePath = path.join(process.cwd(), 'public', 'uploads', safeName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ status: 'success', message: 'File deleted from Media Library' });
    }

    return NextResponse.json({ status: 'error', message: 'File not found' }, { status: 404 });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
