'use client';

export default function DigitalCitizenSection() {
    return (
        <section className="citizen-section container">
            <div className="citizen-grid">
                <div className="dark-card">
                    <span style={{ fontSize: '12px', fontWeight: 700, marginBottom: '10px', display: 'block' }}>CD</span>
                    <h2>Registro en Ciudadanía Digital</h2>
                    <p>
                        Ciudadanía Digital es la identidad digital de las y los ciudadanos bolivianos, mediante la misma podrás interactuar con el Estado boliviano a través de servicios...
                    </p>
                    <a href="#" className="btn-link">Ver trámite →</a>
                </div>
                <div className="dark-card">
                    <h2>Verifica tu registro en Ciudadanía Digital</h2>
                    <p>
                        La constancia de registro es un archivo digital en formato PDF que certifica que, al momento de realizar la consulta, la persona cuenta con un registro activo en Ciudadanía Digital.
                    </p>
                    <a href="#" className="btn-link">Ver trámite →</a>
                </div>
            </div>
        </section>
    );
}
