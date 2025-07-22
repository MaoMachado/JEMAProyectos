export default {
  mounted(el) {
    el.style.opacity = "0";
    el.style.transform = "translateX(50px)";
    el.style.transition = "all 0.8s ease-out";

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
  }
};
