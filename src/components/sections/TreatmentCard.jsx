import React from 'react';
import { motion } from 'framer-motion';

export default function TreatmentCard({ treatment, index }) {
  const { icon: Icon, name, tag, what, detail, points } = treatment;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
      className="bg-background p-8 sm:p-10 group hover:bg-secondary/40 transition-colors duration-500"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-full border border-accent/40 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-colors duration-500">
          <Icon className="w-5 h-5 text-accent group-hover:text-accent-foreground transition-colors duration-500" strokeWidth={1.5} />
        </div>
        <span className="text-[10px] tracking-luxe-sm uppercase text-muted-foreground">{tag}</span>
      </div>
      <h3 className="font-display text-3xl text-primary mb-3">{name}</h3>
      <p className="text-foreground/90 leading-relaxed mb-3 font-medium">{what}</p>
      <p className="text-muted-foreground leading-relaxed mb-6 text-sm">{detail}</p>
      <ul className="space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-center gap-3 text-sm text-foreground/80">
            <span className="w-1 h-1 rounded-full bg-accent" />
            {p}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}