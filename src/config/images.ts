export const imageConfig = {
  domains: {
    faqContent: 'https://cdn.wisland.ai/wisfileai/wisfilefaq',
    faqHeader: 'https://cdn.wisland.ai/wisfileai/headerimage',
  },
  
  limits: {
    totalContentImages: 2000,
    totalHeaderImages: 14,
    totalArticles: 2205,
    chunkSize: 200
  },
  
  formats: {
    content: 'png',
    header: 'jpg'
  },
  
  defaults: {
    contentImage: 'https://cdn.wisland.ai/wisfileai/wisfilefaq/1.png',
    headerImage: 'https://cdn.wisland.ai/wisfileai/headerimage/headerImage1.jpg'
  }
};

/**
 * 根据文章ID获取FAQ内容图片URL
 * 前2000篇文章ID对应内容图片1-2000
 * 超过2000篇的文章循环使用1-2000的图片
 */
export function getFaqContentImageUrl(articleId: number): string {
  const { totalContentImages } = imageConfig.limits;
  
  if (articleId <= totalContentImages) {
    return `${imageConfig.domains.faqContent}/${articleId}.${imageConfig.formats.content}`;
  }
  
  // 超过2000篇的文章循环使用1-2000的图片
  const imageNumber = ((articleId - totalContentImages - 1) % totalContentImages) + 1;
  return `${imageConfig.domains.faqContent}/${imageNumber}.${imageConfig.formats.content}`;
}

/**
 * 随机获取Header图片URL
 * 从14张Header图片中随机选择
 */
export function getRandomHeaderImageUrl(): string {
  const randomNumber = Math.floor(Math.random() * imageConfig.limits.totalHeaderImages) + 1;
  return `${imageConfig.domains.faqHeader}/headerImage${randomNumber}.${imageConfig.formats.header}`;
}

/**
 * 获取默认内容图片URL
 */
export function getDefaultContentImageUrl(): string {
  return imageConfig.defaults.contentImage;
}

/**
 * 获取默认Header图片URL
 */
export function getDefaultHeaderImageUrl(): string {
  return imageConfig.defaults.headerImage;
}
