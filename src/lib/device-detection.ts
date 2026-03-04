import { headers } from 'next/headers';

// 服务端检测移动端
export async function isMobileServer(): Promise<boolean> {
    try {
        const headersList = await headers();
        const userAgent = headersList.get('user-agent') || '';
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    } catch {
        // 如果 headers() 不可用（比如在客户端），返回 false
        return false;
    }
}

// 客户端检测移动端
export function isMobileClient(): boolean {
    if (typeof window === 'undefined') return false;
    const userAgent = navigator.userAgent;
    return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}

// 检测是否为平板设备
export async function isTabletServer(): Promise<boolean> {
    try {
        const headersList = await headers();
        const userAgent = headersList.get('user-agent') || '';
        return /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent);
    } catch {
        return false;
    }
}

// 检测设备类型
export async function getDeviceTypeServer(): Promise<'mobile' | 'tablet' | 'desktop'> {
    try {
        const headersList = await headers();
        const userAgent = headersList.get('user-agent') || '';

        if (/iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)/i.test(userAgent)) {
            return 'tablet';
        }

        if (/Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
            return 'mobile';
        }

        return 'desktop';
    } catch {
        return 'desktop';
    }
} 
