import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HeartPulse, Stethoscope, Hospital, TestTube, UserPlus } from 'lucide-react';

const services = [
  {
    title: '健康监测计划',
    description: '跟踪您的健康指标，获取定期更新，掌握您的健康旅程。',
    icon: HeartPulse,
  },
  {
    title: '综合护理计划',
    description: '我们的护理计划将医疗建议与全面的生活方式指导相结合，为您量身定制。',
    icon: Stethoscope,
  },
  {
    title: '预防性健康服务',
    description: '通过定期检查、接种疫苗和健康教育预防疾病。',
    icon: Hospital,
  },
  {
    title: '整体健康管理',
    description: '我们支持心理健康、营养、运动和压力管理，作为护理的一部分。',
    icon: TestTube,
  },
  {
    title: '康复中心',
    description: '我们的康复服务提供全面的康复和物理治疗。',
    icon: UserPlus,
  },
];

export function Services() {
  return (
    <section id='services' className='py-12 md:py-24'>
      <div className='container text-center mb-10'>
        <h2 className='section-title'>探索我们服务的力量</h2>
        <p className='lead mt-2 max-w-2xl mx-auto'>
          探索旨在提升您整体健康和福祉的多种专业服务。
        </p>
      </div>
      <div className='container grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <Card key={svc.title}>
              <CardHeader className='flex items-center gap-4'>
                <div className='h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full'>
                  <Icon className='h-6 w-6 text-blue-600' />
                </div>
                <CardTitle>{svc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{svc.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
