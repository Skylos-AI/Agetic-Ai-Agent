'use client';

import Header from '@/components/Header';
import SearchHero from '@/components/SearchHero';
import CategoryGrid from '@/components/CategoryGrid';
import DigitalCitizenSection from '@/components/DigitalCitizenSection';
import BlockchainNotarization from '@/components/BlockchainNotarization';
import ProcedureCard from '@/components/ProcedureCard';
import AiAgent from '@/components/AiAgent';
import ProcedureModal from '@/components/ProcedureModal';
import { useLanguage } from '@/context/LanguageContext';
import { useProcedures } from '@/context/ProcedureContext';

export default function Home() {
  const { t } = useLanguage();
  const { procedures } = useProcedures();

  return (
    <>
      <Header />
      <main>
        <SearchHero />

        {/* Ciudadanía Digital Section (Dark Cards) */}
        <DigitalCitizenSection />

        {/* Blockchain Notarization Section */}
        <BlockchainNotarization />

        {/* Categories */}
        <CategoryGrid />

        {/* Services Section */}
        <section className="procedures-section" style={{
          padding: '80px 0',
          background: '#fcfcfc',
          borderTop: '1px solid #f0f0f0'
        }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '50px' }}>
              <div style={{ width: '40px', height: '2px', background: '#DA291C' }}></div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#333' }}>
                {t('active-procedures')}
              </h2>
              <div style={{ flex: 1, height: '1px', background: '#eee' }}></div>
              <span style={{ fontSize: '12px', color: '#999', cursor: 'pointer' }}>Ver todos los servicios →</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '30px'
            }}>
              {procedures.map(proc => (
                <ProcedureCard key={proc.id} procedure={proc} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <AiAgent />
      <ProcedureModal />
    </>
  );
}
