import { NextResponse } from 'next/server';
import { getSiteSettings, saveSiteSettings } from '@/lib/db';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    const seoData = settings.seo || {
      meta_title: 'Certification Planner | #1 Professional Training & Certification Bootcamps',
      meta_description: 'Get certified in PMP, CISSP, AWS, Scrum with 100% pass guarantee bootcamps.',
      meta_keywords: 'PMP certification, CISSP training, AWS bootcamp, Scrum Master',
      og_image: 'https://certificationplanner.com/og-banner.jpg',
      schema_json: '{"@context":"https://schema.org","@type":"EducationalOrganization","name":"Certification Planner"}'
    };
    return NextResponse.json({ status: 'success', data: seoData });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const settings = await getSiteSettings();
    const updatedSettings = await saveSiteSettings({
      ...settings,
      seo: {
        ...(settings.seo || {}),
        ...body
      }
    });
    return NextResponse.json({
      status: 'success',
      message: 'Global SEO and Meta Engine settings updated successfully! 🚀',
      data: updatedSettings.seo
    });
  } catch (err) {
    return NextResponse.json({ status: 'error', message: err.message }, { status: 500 });
  }
}
