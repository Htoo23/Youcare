export function Process() {
  const steps = [
    {
      title: '预约与预定',
      description: '通过我们的在线平台与团队预约。',
    },
    {
      title: '个人健康评估',
      description: '我们的医生评估您的健康状况，并制定适合您需求的计划。',
    },
    {
      title: '个性化健康监测',
      description: '获得个性化的监测和后续咨询。',
    },
  ];
  return (
    <section id='process' className='py-12 md:py-24 bg-muted'>
      <div className='container text-center mb-10'>
        <h2 className='section-title'>流程如何运作？</h2>
        <p className='lead mt-2 max-w-2xl mx-auto'>
          我们简单而有效的流程确保您在每个步骤都能获得最佳护理。
        </p>
      </div>
      <div className='container grid md:grid-cols-3 gap-6'>
        {steps.map((step, idx) => (
          <div key={idx} className='bg-white border border-border rounded-2xl p-6 shadow-soft'>
            <div className='text-primary font-bold text-2xl mb-4'>步骤 {idx + 1}</div>
            <h3 className='font-semibold text-xl mb-2'>{step.title}</h3>
            <p className='text-muted-foreground'>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
