"use client";

import { FAQItem } from '@/components/ui/accordion';

const faqs = [
  {
    q: '你们提供哪些服务？',
    a: '我们提供广泛的健康服务，包括咨询、监测、综合护理计划、预防性健康服务等。',
  },
  {
    q: '我如何预约？',
    a: '您可以通过我们的在线预约系统或联系支持团队轻松预约。',
  },
  {
    q: '初次到访会有什么流程？',
    a: '在初次到访时，我们的健康专家将进行全面的健康评估，以了解您的需求。',
  },
  {
    q: '健康监测计划是如何运作的？',
    a: '我们的健康监测计划跟踪您的健康指标并提供定期报告，帮助您了解自身情况。',
  },
  {
    q: '什么是综合护理计划？',
    a: '综合护理计划结合了医疗建议、生活方式指导和持续支持，帮助您达到最佳健康状态。',
  },
];

export function FAQ() {
  return (
    <section id='faq' className='py-12 md:py-24'>
      <div className='container text-center mb-10'>
        <h2 className='section-title'>常见问题</h2>
        <p className='lead mt-2 max-w-2xl mx-auto'>
          了解关于我们的服务及我们如何帮助您的常见问题的答案。
        </p>
      </div>
      <div className='container max-w-3xl mx-auto'>
        {faqs.map((item, idx) => (
          <FAQItem key={idx} question={item.q} answer={item.a} />
        ))}
      </div>
    </section>
  );
}
