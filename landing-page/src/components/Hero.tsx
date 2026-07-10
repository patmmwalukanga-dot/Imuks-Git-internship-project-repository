import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero-gradient relative pt-24 pb-32 px-margin-mobile overflow-hidden text-center md:text-left">
      <div className="max-w-container-max mx-auto relative z-10 flex flex-col md:flex-row items-center gap-20">
        <div className="md:w-1/2">
          <div className="inline-flex items-center text-secondary-fixed mb-stack-md">
            <span className="material-symbols-outlined text-[16px] mr-2">auto_awesome</span>
            <span className="font-label-sm uppercase tracking-wider">Academic Excellence 2.0</span>
          </div>
          <h1 className="font-headline-xl text-headline-lg-mobile md:text-headline-xl text-white mb-stack-lg leading-tight">
            Stay Ahead of <br className="hidden md:block" />
            the Curve
          </h1>
          <p className="font-body-lg text-body-lg text-on-primary-container/80 mb-stack-lg max-w-lg mx-auto md:mx-0">
            The all-in-one student tracker for grades, tasks, and schedules. Achieve your academic goals with
            surgical precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-stack-md justify-center md:justify-start">
            <button className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-lg font-label-md font-bold transition-all active:scale-95">
              Start Tracking
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-stack-lg md:mt-0">
          <div className="relative w-full aspect-square md:aspect-video rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNVazjBf5XSqeK3VY0_NKHn7hHcZ2NN-mq7gKMQZDZgx_nBtZR0kSVYKAEsBGzRSGtEykQXiUPjMKsG2CDmP01Q9UgA0Mtek7OvDoxlp-l7MaYPvpr0Wf4oZuagp7akfX2tklKUOFtwNnTW8hRfE54c0JRPluBu57c-tgzsobSsf92opfwwvQpitZkriUC35regjLOMlIiEHI0rAy01C1O6mI-87Fe_I-RZgGWTdiv0cid5NpBN7PT7iVQAAdv-k3RJFPFSEXrYsNi"
              alt="Minimalist mobile app interface showing a grade dashboard, set in a bright modern library"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
