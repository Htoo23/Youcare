// A simple knowledge base representing the key information displayed on the site.
// Each entry includes an id, title and content. These values are used by the
// chatbot API to look up answers to user questions. The content is written
// primarily in Simplified Chinese to match the language used throughout the
// application, but it summarizes the same information shown in the various
// sections of the site.

export type KBItem = {
  id: string;
  title: string;
  content: string;
};

/**
 * SITE_KB stores the core information about YouCare's services, process,
 * booking system and frequently asked questions. The chatbot uses these
 * entries to respond to user questions. When adding new sections to the
 * site, consider updating this array accordingly so the assistant stays
 * up‑to‑date.
 */
export const SITE_KB: KBItem[] = [
  {
    id: 'hero',
    title: '站点概览',
    content:
      'YouCare 提供多种健康服务，拥有13年以上经验、85+位专业医生、3M+满意患者、85+成功治疗等。通过首页了解更多。',
  },
  {
    id: 'services',
    title: '我们的服务',
    content:
      '我们提供多种服务，如健康监测计划、综合护理计划、预防性健康服务、整体健康管理、康复中心等。每项服务旨在提升整体健康和福祉。',
  },
  {
    id: 'process',
    title: '服务流程',
    content:
      '我们的流程包括三个步骤：1. 预约与预定—通过在线平台预约医生和时间；2. 个人健康评估—医生评估您的健康状况并制定计划；3. 个性化健康监测—根据个人需求提供持续监测和咨询。',
  },
  {
    id: 'booking',
    title: '预约功能',
    content:
      '在预约页面，您可以填写姓名、联系方式、医生、日期时间和备注，提交后预约会出现在预约列表页面。',
  },
  {
    id: 'bookings',
    title: '预约列表',
    content:
      '预约列表页面展示患者姓名、医生、日期时间和状态（待确认、已确认、已取消）。管理人员可以确认或取消预约。',
  },
  {
    id: 'records',
    title: '健康档案',
    content:
      '健康档案页面显示患者姓名、电子邮箱、电话、过敏史和既往疾病，支持按姓名、邮箱或电话搜索。',
  },
  {
    id: 'faq',
    title: '常见问题',
    content:
      '常见问题解释了 YouCare 提供的服务、如何预约、初次到访流程、健康监测计划运作和综合护理计划的内容。',
  },
  {
    id: 'getting-started',
    title: '开始您的健康之旅',
    content:
      '在 YouCare 网站上，您可以快速进入三项功能：预约咨询、管理预约和查看健康档案。',
  },
];