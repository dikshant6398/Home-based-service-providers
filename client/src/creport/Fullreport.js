import React from 'react';
import CustomerSatisfaction from './CustomerSatisfaction';
import ProjectCompleted from './ProjectCompleted';
import YearsMarket from './YearsMarket';
import HappyCustomer from './HappyCustomer';

export default function Fullreport() {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Why Thousands of Households Trust Us
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Delivering quality, reliability, and peace of mind on every single service call.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 justify-items-center">
          <div className="w-full flex justify-center">
            <CustomerSatisfaction />
          </div>
          <div className="w-full flex justify-center">
            <ProjectCompleted />
          </div>
          <div className="w-full flex justify-center">
            <YearsMarket />
          </div>
          <div className="w-full flex justify-center">
            <HappyCustomer />
          </div>
        </div>
      </div>
    </section>
  );
}
