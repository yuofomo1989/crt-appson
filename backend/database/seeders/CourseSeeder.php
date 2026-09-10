<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Course;
use App\Models\Schedule;

class CourseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Create Categories
        $pmCat = Category::create(['name' => 'Project Management', 'slug' => 'project-management']);
        $secCat = Category::create(['name' => 'Cybersecurity', 'slug' => 'cybersecurity']);
        $cloudCat = Category::create(['name' => 'Cloud & IT', 'slug' => 'cloud-and-it']);

        // 2. Create Courses
        $pmp = Course::create([
            'category_id' => $pmCat->id,
            'title' => 'PMP® Certification Training',
            'slug' => 'pmp-certification',
            'category_name' => 'Project Management',
            'level' => 'Intermediate',
            'rating' => 4.9,
            'reviews_count' => 1420,
            'duration' => '4 Days (35 Contact Hours)',
            'next_date' => 'Aug 15 - Aug 18, 2026',
            'price' => 1095.00,
            'original_price' => 1495.00,
            'badge' => 'Best Seller',
            'image' => '/images/agile_hero_professional.jpg',
            'description' => 'Master the PMBOK® Guide 7th Edition and pass your PMP exam on the first attempt with 35 contact hours approved bootcamp.',
            'features' => ['35 PDUs / Contact Hours Certificate', '100% Pass Guarantee Support', '4 Mock Exams & 1000+ Practice Questions']
        ]);

        $cissp = Course::create([
            'category_id' => $secCat->id,
            'title' => 'CISSP® Certification Prep',
            'slug' => 'cissp-certification',
            'category_name' => 'Cybersecurity',
            'level' => 'Advanced',
            'rating' => 4.8,
            'reviews_count' => 980,
            'duration' => '5 Days (40 Hours)',
            'next_date' => 'Aug 22 - Aug 26, 2026',
            'price' => 1295.00,
            'original_price' => 1695.00,
            'badge' => 'Popular',
            'image' => '/article_security.jpg',
            'description' => 'Comprehensive information security leadership training covering all 8 CISSP domains.',
            'features' => ['40 CPE Credits', 'Official ISC2 Alignment', 'Domain-wise Mock Assessments']
        ]);

        $aws = Course::create([
            'category_id' => $cloudCat->id,
            'title' => 'AWS Certified Solutions Architect',
            'slug' => 'aws-solutions-architect',
            'category_name' => 'Cloud & IT',
            'level' => 'Intermediate',
            'rating' => 4.9,
            'reviews_count' => 1150,
            'duration' => '3 Days (24 Hours)',
            'next_date' => 'Sep 05 - Sep 07, 2026',
            'price' => 995.00,
            'original_price' => 1395.00,
            'badge' => 'Trending',
            'image' => '/article_it.jpg',
            'description' => 'Design resilient, high-performing, secure, and cost-optimized architectures on AWS.',
            'features' => ['Hands-on AWS Cloud Labs', 'Exam Voucher Guidance', 'Architecture Blueprints']
        ]);

        // 3. Create Schedules
        Schedule::create([
            'course_id' => $pmp->id,
            'course_title' => 'PMP® Certification Training',
            'country' => 'United States',
            'city' => 'New York, NY',
            'format' => 'Live Online',
            'batch_date' => 'Aug 15',
            'day' => 'Mon',
            'date_range' => 'Aug 15 – Aug 18, 2026',
            'label' => 'Mon - Thu',
            'time' => '9:00 AM – 5:00 PM EST',
            'duration' => '4 Days',
            'contact_hours' => '35',
            'location' => 'Online Virtual Classroom',
            'price' => 1095.00,
            'seats_left' => 8,
            'status' => 'Open',
            'is_alert' => false
        ]);

        Schedule::create([
            'course_id' => $pmp->id,
            'course_title' => 'PMP® Certification Training',
            'country' => 'United States',
            'city' => 'New York, NY',
            'format' => 'In-Person',
            'batch_date' => 'Aug 22',
            'day' => 'Sat',
            'date_range' => 'Aug 22 – Aug 25, 2026',
            'label' => 'Sat - Tue',
            'time' => '9:00 AM – 5:00 PM EST',
            'duration' => '4 Days',
            'contact_hours' => '35',
            'location' => 'New York, NY Training Center',
            'price' => 1195.00,
            'seats_left' => 3,
            'status' => 'Limited Seats',
            'is_alert' => true
        ]);
    }
}
