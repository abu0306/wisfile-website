import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const userAgent = request.headers.get('user-agent') || '';

    // 设备检测逻辑
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);

    let deviceType: 'mobile' | 'tablet' | 'desktop';
    if (isTablet) {
        deviceType = 'tablet';
    } else if (isMobile) {
        deviceType = 'mobile';
    } else {
        deviceType = 'desktop';
    }

    // 检测操作系统
    let os = 'unknown';
    if (/Windows/i.test(userAgent)) {
        os = 'Windows';
    } else if (/Mac OS X/i.test(userAgent)) {
        os = 'macOS';
    } else if (/Linux/i.test(userAgent)) {
        os = 'Linux';
    } else if (/Android/i.test(userAgent)) {
        os = 'Android';
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        os = 'iOS';
    }

    // 检测浏览器
    let browser = 'unknown';
    if (/Chrome/i.test(userAgent)) {
        browser = 'Chrome';
    } else if (/Firefox/i.test(userAgent)) {
        browser = 'Firefox';
    } else if (/Safari/i.test(userAgent)) {
        browser = 'Safari';
    } else if (/Edge/i.test(userAgent)) {
        browser = 'Edge';
    }

    return NextResponse.json({
        isMobile,
        isTablet,
        deviceType,
        os,
        browser,
        userAgent,
        timestamp: new Date().toISOString()
    });
} 