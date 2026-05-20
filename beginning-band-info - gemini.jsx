import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Play, MapPin, Mail, ExternalLink, Info } from 'lucide-react';

// --- STYLES & PATTERNS ---
// We inject custom Ben-Day dot patterns and brutalist utilities here.
const customStyles = `
  .ben-day-silver {
    background-image: radial-gradient(#C0C0C0 15%, transparent 15%);
    background-size: 12px 12px;
  }
  .ben-day-blue {
    background-image: radial-gradient(#0033A0 15%, transparent 15%);
    background-size: 12px 12px;
  }
  .brutalist-shadow {
    box-shadow: 6px 6px 0px 0px rgba(0,0,0,1);
  }
  .brutalist-shadow-sm {
    box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
  }
  .brutalist-hover:hover {
    transform: translate(2px, 2px);
    box-shadow: 4px 4px 0px 0px rgba(0,0,0,1);
  }
  .brutalist-hover-sm:hover {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px 0px rgba(0,0,0,1);
  }
`;

// --- DATA & TRANSLATIONS ---
const content = {
  en: {
    appTitle: "YOUR BAND JOURNEY STARTS HERE",
    welcome: "Welcome to the Dean Middle School Mustang Band!",
    questions: {
      q1: "What is Band?",
      q2: "When Does Band Meet?",
      q3: "What Will I Do in Class?",
      q4: "What Instrument Will I Play?",
      q5: "How Do I Choose My Instrument?",
      q6: "What Do I Need?",
      q7: "How Do I Get My Instrument?",
      q8: "Contact Us"
    },
    sections: {
      whatIsBand: "In band class, students learn to play wind instruments (instruments you blow into) and percussion (instruments you hit). Unlike orchestra, band does not include string instruments like violin — and unlike a general music class, there are no pianos or guitars either. Band music has a rich history spanning many styles and cultures, including marching band, jazz, big band, mariachi, banda, and more.",
      whenDoesItMeet: "Band is a regular class, just like math, reading, language arts, science, and PE. It meets every school day during the regular school day — not after school, not as a club. Joining band doesn't mean giving anything up; it fits right into a normal schedule alongside everything else. In beginning band, after-school commitments are minimal — typically just one rehearsal before the big spring concert.",
      whatWillIDo: "In band class, students learn to read music, assemble and care for their instrument, play scales and fundamental exercises, and perform songs both on their own and as part of the group. Most importantly, they have a whole lot of fun.",
      howToChoose: "Choosing an instrument isn't just about picking your favorite — it's about finding the one that fits you best so you can play it well and have the best possible band experience. During the instrument selection process, your band director will look at a few things:\n\n• **Your embouchure** — the shape of your lips and the way air flows between them\n• **Your tooth alignment** — how your top and bottom teeth line up\n• **Your ear** — your ability to recognize and match tones when you hear them\n• **Your hands and fingers** — how your fingers move, as well as factors like hand size and arm length\n\nNo single factor makes or breaks anything — it's the whole picture together that helps point toward the right instrument. The goal is to set you up for success from day one.",
      whatDoINeed_school: "Instruments provided by the school\nStudents who play oboe, bassoon, French horn, euphonium, or tuba will be issued an instrument at no cost — these instruments are large and expensive, and the school maintains a supply of them. These students will only need to obtain a small number of personal supplies, such as a mouthpiece or reeds. It's worth noting that these are also some of the more challenging instruments in band, so they may not be the right fit for everyone.",
      whatDoINeed_woodwind: "Woodwind instruments (flute, clarinet, alto saxophone, oboe, bassoon)\nWoodwind players typically need:\n• Reeds (all woodwinds except flute)\n• A swab for cleaning the inside of the instrument\n• Additional supplies specific to each instrument",
      whatDoINeed_brass: "Brass instruments (trumpet, trombone, French horn, euphonium, tuba)\nBrass players typically need:\n• Their instrument and mouthpiece\n• Cleaning and maintenance supplies",
      whatDoINeed_percussion: "Percussion\nPercussion students typically need:\n• A variety of sticks and mallets\n• A bag to carry them in\n• A practice pad for home practice\n• A keyboard instrument (such as a small xylophone or bells) for home practice",
      howToGet_store: "From a music store\nWe recommend renting or purchasing from a reputable music store. Renting is a popular choice for beginners — it lets students try the instrument before committing to a purchase, and many rental programs include maintenance and the option to apply payments toward buying later.",
      howToGet_used: "Buying used\nA used instrument from a reputable brand in good condition can actually be a better choice than buying a cheap new one. Sites like Facebook Marketplace can be a good place to look — just make sure to search for the right brands and models.",
      howToGet_online: "A word of caution about inexpensive instruments online\nBargain instruments sold on Amazon or similar sites may seem appealing, but repair technicians frequently report that these instruments are difficult or impossible to service — replacement parts often don't exist, and the instruments can actually break further in the process of being repaired. Please keep that in mind when shopping.",
      howToGet_cost: "That all sounds expensive...\nWe understand that cost is a real concern for many families. We are committed to making sure every student who wants to play has a chance to do so, and we will do everything we can to help find a solution for each student. That said, our school-owned instruments are very limited in number, so we ask that any family who is able to obtain their own instrument please do so, allowing our limited resources to go to those who truly need them.",
      contactUs_students: "Students — the best way to reach us is through a Schoology message.",
      contactUs_parents: "Parents — feel free to email us directly at the addresses below.",
    },
    ui: {
      watchVideo: "WATCH VIDEO",
      recommended: "RECOMMENDED BRANDS:",
      supplies: "SUPPLIES:",
      instrumentIntro: "Beginning band students choose from a family of wind and percussion instruments. Browse below to learn a little about each one.",
      percussionIntro: "Percussion is much more than just drums. In beginning band, percussion students take a total percussion approach — developing skills across the full family of percussion instruments, including snare drum, keyboard instruments like xylophone and marimba, and accessory instruments like maracas, triangle, and cymbals. Percussionists are some of the most well-rounded musicians in the band."
    }
  },
  es: {
    appTitle: "TU VIAJE MUSICAL EMPIEZA AQUÍ",
    welcome: "¡Bienvenidos a la Banda de los Mustangs de Dean Middle School!",
    questions: {
      q1: "¿Qué es la Banda?",
      q2: "¿Cuándo se reúne la Banda?",
      q3: "¿Qué haré en clase?",
      q4: "¿Qué instrumento tocaré?",
      q5: "¿Cómo elijo mi instrumento?",
      q6: "¿Qué necesito?",
      q7: "¿Cómo obtengo mi instrumento?",
      q8: "Contáctenos"
    },
    sections: {
      whatIsBand: "En la clase de banda, los estudiantes aprenden a tocar instrumentos de viento (instrumentos que se soplan) y percusión (instrumentos que se golpean). A diferencia de la orquesta, la banda no incluye instrumentos de cuerda como el violín, y a diferencia de una clase de música general, tampoco hay pianos ni guitarras. La música de banda tiene una rica historia que abarca muchos estilos y culturas, incluyendo bandas de música, jazz, big band, mariachi, banda sinaloense y más.",
      whenDoesItMeet: "La banda es una clase regular, al igual que matemáticas, lectura, ciencias y educación física. Se reúne todos los días escolares durante el horario regular, no después de clases ni como un club. Unirse a la banda no significa tener que renunciar a nada; encaja perfectamente en un horario normal junto a todo lo demás. En la banda de principiantes, los compromisos extracurriculares son mínimos (generalmente solo un ensayo antes del gran concierto de primavera).",
      whatWillIDo: "En la clase de banda, los estudiantes aprenden a leer música, a armar y cuidar su instrumento, a tocar escalas y ejercicios fundamentales, y a interpretar canciones tanto por su cuenta como parte del grupo. Y lo más importante, se divierten muchísimo.",
      howToChoose: "Elegir un instrumento no se trata solo de escoger tu favorito, se trata de encontrar el que mejor se adapte a ti para que puedas tocarlo bien y tener la mejor experiencia posible en la banda. Durante el proceso de selección, el director de la banda observará algunas cosas:\n\n• **Tu embocadura** — la forma de tus labios y cómo fluye el aire entre ellos\n• **La alineación de tus dientes** — cómo se alinean tus dientes superiores e inferiores\n• **Tu oído** — tu capacidad para reconocer e igualar tonos cuando los escuchas\n• **Tus manos y dedos** — cómo se mueven tus dedos, además de factores como el tamaño de la mano y la longitud del brazo\n\nNingún factor por sí solo es decisivo: es el conjunto completo lo que ayuda a indicar cuál es el instrumento adecuado. El objetivo es prepararte para el éxito desde el primer día.",
      whatDoINeed_school: "Instrumentos proporcionados por la escuela\nA los estudiantes que toquen oboe, fagot, corno francés, bombardino o tuba se les entregará un instrumento sin costo. Estos instrumentos son grandes y costosos, y la escuela mantiene un suministro de ellos. Estos estudiantes solo necesitarán obtener una pequeña cantidad de suministros personales, como una boquilla o cañas. Vale la pena señalar que estos también son algunos de los instrumentos más desafiantes, por lo que puede que no sean la opción ideal para todos.",
      whatDoINeed_woodwind: "Instrumentos de viento-madera (flauta, clarinete, saxofón alto, oboe, fagot)\nLos músicos de viento-madera generalmente necesitan:\n• Cañas (todos excepto la flauta)\n• Un paño para limpiar el interior del instrumento\n• Suministros adicionales específicos para cada instrumento",
      whatDoINeed_brass: "Instrumentos de viento-metal (trompeta, trombón, corno francés, bombardino, tuba)\nLos músicos de viento-metal generalmente necesitan:\n• Su instrumento y boquilla\n• Suministros de limpieza y mantenimiento",
      whatDoINeed_percussion: "Percusión\nLos estudiantes de percusión generalmente necesitan:\n• Una variedad de baquetas y mazos\n• Una bolsa para transportarlos\n• Una almohadilla de práctica (practice pad) para usar en casa\n• Un instrumento de teclado (como un xilófono pequeño o campanas) para practicar en casa",
      howToGet_store: "De una tienda de música\nRecomendamos alquilar o comprar en una tienda de música de buena reputación. Alquilar es una opción popular para los principiantes: permite a los estudiantes probar el instrumento antes de comprometerse a comprarlo, y muchos programas de alquiler incluyen mantenimiento y la opción de aplicar los pagos hacia la compra más adelante.",
      howToGet_used: "Comprar usado\nUn instrumento usado de una marca reconocida y en buenas condiciones puede ser en realidad una mejor opción que comprar uno nuevo y barato. Sitios como Facebook Marketplace pueden ser un buen lugar para buscar, solo asegúrese de buscar las marcas y modelos correctos.",
      howToGet_online: "Una advertencia sobre los instrumentos económicos en línea\nLos instrumentos en oferta vendidos en Amazon o sitios similares pueden parecer atractivos, pero los técnicos de reparación informan con frecuencia que estos instrumentos son difíciles o imposibles de reparar: a menudo no existen repuestos, y los instrumentos pueden romperse aún más en el proceso de reparación. Por favor, tenga esto en cuenta al comprar.",
      howToGet_cost: "Todo eso suena costoso...\nEntendemos que el costo es una preocupación real para muchas familias. Estamos comprometidos a asegurarnos de que todo estudiante que quiera tocar tenga la oportunidad de hacerlo, y haremos todo lo posible para ayudar a encontrar una solución para cada estudiante. Dicho esto, nuestros instrumentos escolares son muy limitados en número, por lo que pedimos que cualquier familia que pueda obtener su propio instrumento lo haga, permitiendo que nuestros recursos limitados vayan a quienes realmente los necesitan.",
      contactUs_students: "Estudiantes — la mejor manera de comunicarse con nosotros es a través de un mensaje en Schoology.",
      contactUs_parents: "Padres — no duden en enviarnos un correo electrónico directamente a las direcciones a continuación.",
    },
    ui: {
      watchVideo: "VER VIDEO",
      recommended: "MARCAS RECOMENDADAS:",
      supplies: "SUMINISTROS:",
      instrumentIntro: "Los estudiantes de la banda de principiantes eligen entre una familia de instrumentos de viento y percusión. Explora a continuación para aprender un poco sobre cada uno.",
      percussionIntro: "La percusión es mucho más que solo tambores. En la banda de principiantes, los estudiantes desarrollan habilidades en toda la familia de instrumentos de percusión, incluyendo la caja, instrumentos de teclado como el xilófono y la marimba, y accesorios como maracas, triángulos y platillos. Los percusionistas son algunos de los músicos más completos de la banda."
    }
  }
};

const instrumentsData = [
  {
    id: "flute",
    name: { en: "Flute", es: "Flauta" },
    family: { en: "Woodwind", es: "Viento-madera" },
    desc: {
      en: "A high-pitched, agile woodwind instrument held sideways. It produces a light, airy sound and often plays the melody.",
      es: "Un instrumento de viento-madera ágil y de tono agudo que se sostiene de lado. Produce un sonido ligero y aireado, y a menudo toca la melodía."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Flute_with_B_foot.jpg/800px-Flute_with_B_foot.jpg",
    brands: "Yamaha, Jupiter, Trevor James",
    supplies: { en: "Cleaning rod, silk swab", es: "Varilla de limpieza, paño de seda" },
    youtube: "https://youtube.com" // Placeholder
  },
  {
    id: "oboe",
    name: { en: "Oboe", es: "Oboe" },
    family: { en: "Woodwind", es: "Viento-madera" },
    desc: {
      en: "A unique double-reed woodwind known for its distinct, penetrating, and beautiful sound. It requires focused breathing and finger agility.",
      es: "Un instrumento único de doble caña conocido por su sonido distintivo y penetrante. Requiere una respiración enfocada y agilidad en los dedos."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Oboe_modern.jpg/400px-Oboe_modern.jpg",
    brands: "School Provided (Fox, Yamaha)",
    supplies: { en: "Oboe reeds (medium soft), silk swab, cork grease", es: "Cañas de oboe, paño de seda, grasa para corcho" },
    youtube: "https://youtube.com"
  },
  {
    id: "bassoon",
    name: { en: "Bassoon", es: "Fagot" },
    family: { en: "Woodwind", es: "Viento-madera" },
    desc: {
      en: "The lowest sounding woodwind instrument. It uses a double reed and produces a deep, rich, and sometimes comical tone.",
      es: "El instrumento de viento-madera de sonido más grave. Utiliza una doble caña y produce un tono profundo y rico."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Fagott-Bassoon.png/400px-Fagott-Bassoon.png",
    brands: "School Provided (Fox)",
    supplies: { en: "Bassoon reeds, seat strap, swab", es: "Cañas de fagot, correa de asiento, paño de limpieza" },
    youtube: "https://youtube.com"
  },
  {
    id: "clarinet",
    name: { en: "Clarinet", es: "Clarinete" },
    family: { en: "Woodwind", es: "Viento-madera" },
    desc: {
      en: "A versatile single-reed woodwind with a massive range of notes. It's heavily featured in both classical and jazz music.",
      es: "Un versátil instrumento de caña simple con una enorme gama de notas. Es muy destacado tanto en música clásica como en jazz."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Clarinet-trans.png/400px-Clarinet-trans.png",
    brands: "Yamaha, Buffet Crampon",
    supplies: { en: "Vandoren reeds (size 2.5), silk swab, cork grease", es: "Cañas Vandoren (tamaño 2.5), paño de seda, grasa para corcho" },
    youtube: "https://youtube.com"
  },
  {
    id: "saxophone",
    name: { en: "Alto Saxophone", es: "Saxofón Alto" },
    family: { en: "Woodwind", es: "Viento-madera" },
    desc: {
      en: "A popular single-reed instrument made of brass. It bridges the gap between woodwind agility and brass power.",
      es: "Un popular instrumento de caña simple hecho de latón. Cierra la brecha entre la agilidad de la madera y la potencia del metal."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Alto_saxophone_with_mouthpiece.jpg/400px-Alto_saxophone_with_mouthpiece.jpg",
    brands: "Yamaha, Jupiter",
    supplies: { en: "Vandoren reeds, neck strap, swab", es: "Cañas Vandoren, correa para el cuello, paño de limpieza" },
    youtube: "https://youtube.com"
  },
  {
    id: "trumpet",
    name: { en: "Trumpet", es: "Trompeta" },
    family: { en: "Brass", es: "Viento-metal" },
    desc: {
      en: "The highest and brightest of the brass instruments. It leads the band with a powerful, heroic sound.",
      es: "El instrumento de viento-metal más agudo y brillante. Lidera la banda con un sonido potente y heroico."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Trumpet_1.jpg/400px-Trumpet_1.jpg",
    brands: "Yamaha, Bach",
    supplies: { en: "Valve oil, slide grease, cleaning snake", es: "Aceite de válvulas, grasa para bombas, cepillo flexible" },
    youtube: "https://youtube.com"
  },
  {
    id: "frenchhorn",
    name: { en: "French Horn", es: "Corno Francés" },
    family: { en: "Brass", es: "Viento-metal" },
    desc: {
      en: "A uniquely coiled brass instrument played with one hand resting inside the bell. It has a beautiful, mellow, and majestic tone.",
      es: "Un instrumento de viento-metal excepcionalmente enroscado que se toca con una mano dentro de la campana. Tiene un tono majestuoso."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/French_horn_front.png/400px-French_horn_front.png",
    brands: "School Provided (Holton, Yamaha)",
    supplies: { en: "Rotary oil, slide grease, mouthpiece", es: "Aceite rotativo, grasa para bombas, boquilla" },
    youtube: "https://youtube.com"
  },
  {
    id: "trombone",
    name: { en: "Trombone", es: "Trombón" },
    family: { en: "Brass", es: "Viento-metal" },
    desc: {
      en: "A powerful brass instrument that uses a slide instead of valves to change notes. It forms the strong, rich core of the brass section.",
      es: "Un potente instrumento que utiliza una vara en lugar de válvulas para cambiar de nota. Forma el núcleo de la sección de metales."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Trombone_cg_background.jpg/800px-Trombone_cg_background.jpg",
    brands: "Yamaha, Bach, Conn",
    supplies: { en: "Slide-O-Mix, tuning slide grease, spray bottle", es: "Slide-O-Mix, grasa para bombas, botella de spray" },
    youtube: "https://youtube.com"
  },
  {
    id: "euphonium",
    name: { en: "Euphonium", es: "Bombardino" },
    family: { en: "Brass", es: "Viento-metal" },
    desc: {
      en: "Looks like a small tuba but plays in the same range as the trombone. It's known for its incredibly smooth, dark, and velvety sound.",
      es: "Parece una tuba pequeña pero toca en el mismo registro que el trombón. Es conocido por su sonido increíblemente suave y oscuro."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Euphonium.jpg/400px-Euphonium.jpg",
    brands: "School Provided (Yamaha)",
    supplies: { en: "Valve oil, slide grease, mouthpiece", es: "Aceite de válvulas, grasa para bombas, boquilla" },
    youtube: "https://youtube.com"
  },
  {
    id: "tuba",
    name: { en: "Tuba", es: "Tuba" },
    family: { en: "Brass", es: "Viento-metal" },
    desc: {
      en: "The largest and lowest instrument in the band. It provides the crucial bass foundation that the entire band builds their sound upon.",
      es: "El instrumento más grande y grave de la banda. Proporciona la base de bajos crucial sobre la que toda la banda construye su sonido."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Tuba_in_B.jpg/400px-Tuba_in_B.jpg",
    brands: "School Provided (Yamaha, Jupiter)",
    supplies: { en: "Rotary/Valve oil, tuning slide grease, mouthpiece", es: "Aceite de válvulas, grasa para bombas, boquilla" },
    youtube: "https://youtube.com"
  },
  {
    id: "percussion",
    name: { en: "Percussion", es: "Percusión" },
    family: { en: "Percussion", es: "Percusión" },
    desc: {
      en: "A vast family of instruments you hit, shake, or scrape. Percussionists learn snare drum, keyboards (marimba/xylophone), and accessories.",
      es: "Una gran familia de instrumentos que se golpean, agitan o raspan. Los percusionistas aprenden caja, teclados y accesorios."
    },
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Percussion_instruments_in_a_symphony_orchestra.jpg/800px-Percussion_instruments_in_a_symphony_orchestra.jpg",
    brands: "Yamaha, Pearl, Ludwig, Innovative Percussion",
    supplies: { en: "Stick bag, bell kit, practice pad", es: "Bolsa para baquetas, kit de campanas, almohadilla de práctica" },
    youtube: "https://youtube.com"
  }
];

// --- FORMATTING HELPER ---
// Converts standard text with basic markdown-style bullets into formatted HTML elements
const formatText = (text) => {
  return text.split('\n').map((line, i) => {
    if (line.trim().startsWith('•')) {
      const parts = line.substring(1).trim().split('—');
      return (
        <li key={i} className="ml-6 mb-2 list-none relative">
          <span className="absolute -left-6 top-1 w-3 h-3 bg-black"></span>
          {parts.length > 1 ? (
             <span><strong className="font-black uppercase">{parts[0].replace(/\*\*/g, '').trim()}</strong> — {parts.slice(1).join('—').trim()}</span>
          ) : (
             <span>{line.substring(1).trim()}</span>
          )}
        </li>
      );
    }
    return <p key={i} className="mb-4 text-lg font-medium leading-relaxed">{line}</p>;
  });
};

// --- COMPONENTS ---

const AccordionItem = ({ title, isOpen, onClick, children }) => {
  return (
    <div className="mb-6 bg-white border-4 border-black brutalist-shadow transition-all duration-200 ease-in-out">
      <button 
        onClick={onClick}
        className="w-full p-4 sm:p-6 flex justify-between items-center bg-white hover:bg-gray-50 focus:outline-none"
      >
        <h2 className="text-xl sm:text-3xl font-black uppercase text-left tracking-tight pr-4">{title}</h2>
        <div className="w-10 h-10 border-4 border-black bg-[#0033A0] text-white flex items-center justify-center flex-shrink-0 shrink-0">
          {isOpen ? <ChevronUp size={24} strokeWidth={4} /> : <ChevronDown size={24} strokeWidth={4} />}
        </div>
      </button>
      
      {isOpen && (
        <div className="p-4 sm:p-8 border-t-4 border-black bg-white ben-day-silver">
          <div className="bg-white border-4 border-black p-4 sm:p-8">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [openPanel, setOpenPanel] = useState(null);
  const t = content[lang];

  const togglePanel = (panelId) => {
    setOpenPanel(openPanel === panelId ? null : panelId);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden selection:bg-[#0033A0] selection:text-white pb-20">
      <style>{customStyles}</style>

      {/* --- STICKY HEADER --- */}
      <header className="sticky top-0 z-50 bg-[#0033A0] border-b-8 border-black p-4 brutalist-shadow">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-4">
             {/* Mustang Graphic Anchor */}
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white border-4 border-black rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 relative">
              <svg viewBox="0 0 100 100" className="w-10 h-10 sm:w-14 sm:h-14 mt-2" fill="#000">
                <path d="M75,20 C70,15 60,10 50,20 C45,15 35,25 30,35 C20,40 10,60 15,75 C20,90 35,95 45,85 C55,75 50,60 60,50 C70,40 85,35 75,20 Z" />
                <path d="M60,25 C65,22 72,25 70,30 L65,35 Z" fill="#fff"/>
              </svg>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tighter drop-shadow-[4px_4px_0_rgba(0,0,0,1)] text-center sm:text-left leading-none">
                {t.appTitle}
              </h1>
              <p className="text-white font-bold text-sm sm:text-base tracking-widest mt-1 bg-black px-2 py-0.5 inline-block w-max border-2 border-white">
                DEAN MIDDLE SCHOOL BAND
              </p>
            </div>
          </div>

          <div className="flex border-4 border-black bg-white brutalist-shadow-sm flex-shrink-0">
            <button 
              onClick={() => setLang('en')} 
              className={`px-4 py-2 font-black uppercase transition-colors ${lang === 'en' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
            >
              EN
            </button>
            <div className="w-1 bg-black"></div>
            <button 
              onClick={() => setLang('es')} 
              className={`px-4 py-2 font-black uppercase transition-colors ${lang === 'es' ? 'bg-black text-white' : 'hover:bg-gray-200'}`}
            >
              ES
            </button>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto mt-8 px-4 sm:px-6">
        
        {/* Intro banner */}
        <div className="bg-[#C0C0C0] border-4 border-black p-6 mb-12 brutalist-shadow ben-day-blue relative overflow-hidden group">
           <div className="bg-white border-4 border-black p-4 relative z-10 text-center brutalist-hover transition-transform duration-300">
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
                 {t.welcome}
              </h2>
           </div>
        </div>

        {/* --- ACCORDION MENU --- */}
        
        {/* Q1: What is Band? */}
        <AccordionItem title={t.questions.q1} isOpen={openPanel === 'q1'} onClick={() => togglePanel('q1')}>
          {formatText(t.sections.whatIsBand)}
        </AccordionItem>

        {/* Q2: When Does Band Meet? */}
        <AccordionItem title={t.questions.q2} isOpen={openPanel === 'q2'} onClick={() => togglePanel('q2')}>
           {formatText(t.sections.whenDoesItMeet)}
        </AccordionItem>

        {/* Q3: What Will I Do in Class? */}
        <AccordionItem title={t.questions.q3} isOpen={openPanel === 'q3'} onClick={() => togglePanel('q3')}>
           {formatText(t.sections.whatWillIDo)}
        </AccordionItem>

        {/* Q4: What Instrument Will I Play? (BROWSER) */}
        <AccordionItem title={t.questions.q4} isOpen={openPanel === 'q4'} onClick={() => togglePanel('q4')}>
          <p className="mb-8 text-xl font-bold bg-[#0033A0] text-white p-4 border-4 border-black inline-block">
            {t.ui.instrumentIntro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {instrumentsData.map(inst => (
              <div key={inst.id} className="border-4 border-black bg-white flex flex-col brutalist-shadow">
                
                {/* Image Section */}
                <div className="h-48 sm:h-64 border-b-4 border-black bg-gray-100 overflow-hidden relative group">
                  <div className="absolute inset-0 ben-day-silver opacity-50"></div>
                  <img 
                    src={inst.img} 
                    alt={inst.name[lang]} 
                    className="w-full h-full object-contain p-4 relative z-10 mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 font-black text-xs uppercase z-20 border-2 border-white shadow-[2px_2px_0_#fff]">
                    {inst.family[lang]}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{inst.name[lang]}</h3>
                  <p className="font-medium text-gray-800 mb-6 flex-grow text-sm sm:text-base leading-relaxed">
                    {inst.desc[lang]}
                  </p>

                  <div className="space-y-4 mb-6 text-sm">
                     <div className="border-l-4 border-[#0033A0] pl-3">
                        <span className="font-black uppercase text-xs block mb-1">{t.ui.recommended}</span>
                        <span className="font-medium">{inst.brands}</span>
                     </div>
                     <div className="border-l-4 border-black pl-3">
                        <span className="font-black uppercase text-xs block mb-1">{t.ui.supplies}</span>
                        <span className="font-medium">{inst.supplies[lang]}</span>
                     </div>
                  </div>
                  
                  {/* Comic Book Style Button */}
                  <a 
                    href={inst.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto bg-[#0033A0] text-white border-4 border-black p-3 font-black text-center uppercase tracking-wider flex items-center justify-center gap-2 brutalist-hover-sm group"
                  >
                    <Play fill="white" size={20} className="group-hover:scale-125 transition-transform" />
                    {t.ui.watchVideo}
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-[#C0C0C0] border-4 border-black p-6 relative z-0">
             <div className="absolute top-0 right-0 w-full h-full ben-day-blue opacity-20 -z-10"></div>
             <div className="flex gap-4 items-start">
               <div className="bg-black text-white p-2 border-2 border-white flex-shrink-0">
                  <Info size={32} />
               </div>
               <p className="text-base sm:text-lg font-bold">
                 {t.ui.percussionIntro}
               </p>
             </div>
          </div>
        </AccordionItem>

        {/* Q5: How Do I Choose My Instrument? */}
        <AccordionItem title={t.questions.q5} isOpen={openPanel === 'q5'} onClick={() => togglePanel('q5')}>
           {formatText(t.sections.howToChoose)}
        </AccordionItem>

        {/* Q6: What Do I Need? */}
        <AccordionItem title={t.questions.q6} isOpen={openPanel === 'q6'} onClick={() => togglePanel('q6')}>
           <div className="space-y-12">
              <div className="border-4 border-black p-6 bg-white relative">
                 <div className="absolute -top-4 -left-4 bg-[#0033A0] text-white px-4 py-1 font-black text-xl border-4 border-black">1</div>
                 {formatText(t.sections.whatDoINeed_school)}
              </div>
              
              <div className="border-4 border-black p-6 bg-white relative">
                 <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-1 font-black text-xl border-4 border-black">2</div>
                 {formatText(t.sections.whatDoINeed_woodwind)}
              </div>

              <div className="border-4 border-black p-6 bg-white relative">
                 <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-1 font-black text-xl border-4 border-black">3</div>
                 {formatText(t.sections.whatDoINeed_brass)}
              </div>

              <div className="border-4 border-black p-6 bg-white relative">
                 <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-1 font-black text-xl border-4 border-black">4</div>
                 {formatText(t.sections.whatDoINeed_percussion)}
              </div>
           </div>
        </AccordionItem>

        {/* Q7: How Do I Get My Instrument? */}
        <AccordionItem title={t.questions.q7} isOpen={openPanel === 'q7'} onClick={() => togglePanel('q7')}>
           
           <div className="mb-8">
              {formatText(t.sections.howToGet_store)}
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                 <a href="#" className="flex-1 bg-[#0033A0] text-white border-4 border-black p-4 font-black uppercase text-center brutalist-hover-sm flex items-center justify-center gap-2">
                    H&H Music <ExternalLink size={18} />
                 </a>
                 <a href="#" className="flex-1 bg-[#0033A0] text-white border-4 border-black p-4 font-black uppercase text-center brutalist-hover-sm flex items-center justify-center gap-2">
                    Music & Arts <ExternalLink size={18} />
                 </a>
              </div>
           </div>

           <div className="mb-8 pt-8 border-t-8 border-black border-dashed">
              {formatText(t.sections.howToGet_used)}
           </div>

           <div className="mb-8 bg-black text-white p-6 border-4 border-white outline outline-4 outline-black brutalist-shadow">
              {formatText(t.sections.howToGet_online)}
           </div>

           <div className="pt-8">
              {formatText(t.sections.howToGet_cost)}
           </div>
        </AccordionItem>

        {/* Q8: Contact Us */}
        <AccordionItem title={t.questions.q8} isOpen={openPanel === 'q8'} onClick={() => togglePanel('q8')}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-[#C0C0C0] p-6 border-4 border-black brutalist-shadow-sm">
                 <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                    <Info size={28} /> STUDENTS
                 </h3>
                 <p className="font-medium text-lg leading-relaxed">
                    {t.sections.contactUs_students}
                 </p>
              </div>

              <div className="bg-[#0033A0] text-white p-6 border-4 border-black brutalist-shadow-sm">
                 <h3 className="text-2xl font-black uppercase mb-4 flex items-center gap-2">
                    <Mail size={28} /> PARENTS
                 </h3>
                 <p className="font-medium text-lg leading-relaxed">
                    {t.sections.contactUs_parents}
                 </p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t-4 border-black">
              
              {/* Paul Hogue */}
              <div className="border-4 border-black p-4 flex flex-col justify-center text-center brutalist-hover-sm group cursor-pointer" onClick={() => window.location = 'mailto:paul.hogue@cfisd.net'}>
                 <span className="font-black text-xl uppercase mb-1 group-hover:text-[#0033A0] transition-colors">Paul Hogue</span>
                 <span className="text-sm font-bold bg-black text-white inline-block mx-auto px-2 py-0.5 mb-2">Head Band Director</span>
                 <span className="text-sm font-medium underline">paul.hogue@cfisd.net</span>
              </div>

              {/* Justin Butterfras */}
              <div className="border-4 border-black p-4 flex flex-col justify-center text-center brutalist-hover-sm group cursor-pointer" onClick={() => window.location = 'mailto:william.butterfras@cfisd.net'}>
                 <span className="font-black text-xl uppercase mb-1 group-hover:text-[#0033A0] transition-colors">Justin Butterfras</span>
                 <span className="text-sm font-bold bg-gray-200 text-black border-2 border-black inline-block mx-auto px-2 py-0.5 mb-2">Director</span>
                 <span className="text-sm font-medium underline">william.butterfras@cfisd.net</span>
              </div>

              {/* Andrew Vanegas */}
              <div className="border-4 border-black p-4 flex flex-col justify-center text-center brutalist-hover-sm group cursor-pointer" onClick={() => window.location = 'mailto:andrew.vanegas@cfisd.net'}>
                 <span className="font-black text-xl uppercase mb-1 group-hover:text-[#0033A0] transition-colors">Andrew Vanegas</span>
                 <span className="text-sm font-bold bg-gray-200 text-black border-2 border-black inline-block mx-auto px-2 py-0.5 mb-2">Director</span>
                 <span className="text-sm font-medium underline">andrew.vanegas@cfisd.net</span>
              </div>

           </div>
        </AccordionItem>
      </main>
      
      {/* Footer decorative anchor */}
      <div className="max-w-4xl mx-auto mt-16 flex justify-center">
         <div className="w-full h-4 bg-black ben-day-blue"></div>
      </div>
    </div>
  );
}