"use client";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch } from "react-redux";

import { setActiveSection } from "@/redux/slices/activeSection";

export default function Section({ id, children }: SectionProps) {
  const dispatch = useDispatch();
  const previousInView = useRef(false);

  const { ref, inView } = useInView({
    rootMargin: "-50% 0px -50% 0px",
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !previousInView.current) {
      dispatch(setActiveSection(id));
    }
    previousInView.current = inView;
  }, [inView, id, dispatch]);

  return (
    <section ref={ref} id={id} className="min-h-screen">
      {children}
    </section>
  );
}
