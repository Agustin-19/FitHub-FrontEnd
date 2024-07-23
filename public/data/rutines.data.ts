// src/rutinas.ts
export interface IRutina {
    id: number;
    name: string;
    description: string;
    precio: number;
    imagen: string;
    categoria: string;
    ejercicios: IRutinaEjercicio[];
    borradologico: boolean;
}

export interface IRutinaEjercicio {
    id: number;
    name: string;
    description: string;
    imagen: string;
    series: number;
    repeticiones: number;
    tiempoActividad: number;
    tiempoDescanso: number;
}

export const rutinas: IRutina[] = [
    {
        id: 1,
        name: "Fuerza Total",
        description: "Una rutina completa para aumentar la fuerza en todo el cuerpo.",
        precio: 29.99,
        imagen: "https://media.gq.com.mx/photos/625db17471f363f634bce022/master/pass/ejercicio-1388957838.jpg",
        categoria: "Fuerza",
        ejercicios: [
            {
                id: 1,
                name: "Sentadillas",
                description: "Ejercicio para fortalecer piernas y glúteos.",
                imagen: "sentadillas.jpg",
                series: 4,
                repeticiones: 12,
                tiempoActividad: 60,
                tiempoDescanso: 90,
            },
            {
                id: 2,
                name: "Press de Banca",
                description: "Ejercicio para desarrollar el pecho, hombros y tríceps.",
                imagen: "press_banca.jpg",
                series: 4,
                repeticiones: 10,
                tiempoActividad: 50,
                tiempoDescanso: 120,
            },
            {
                id: 3,
                name: "Peso Muerto",
                description: "Ejercicio compuesto que trabaja la cadena posterior.",
                imagen: "peso_muerto.jpg",
                series: 4,
                repeticiones: 8,
                tiempoActividad: 70,
                tiempoDescanso: 150,
            },
            {
                id: 4,
                name: "Dominadas",
                description: "Ejercicio para la espalda y los brazos.",
                imagen: "dominadas.jpg",
                series: 3,
                repeticiones: 6,
                tiempoActividad: 40,
                tiempoDescanso: 180,
            },
        ],
        borradologico: false,
    },
    {
        id: 2,
        name: "Resistencia Cardio",
        description: "Mejora tu resistencia cardiovascular con estos ejercicios.",
        precio: 24.99,
        imagen: "https://i0.wp.com/blog.smartfit.com.mx/wp-content/uploads/2018/04/cuando-cambiar-rutina-del-gym.jpg?fit=1200%2C675&ssl=1",
        categoria: "Cardio",
        ejercicios: [
            {
                id: 5,
                name: "Correr",
                description: "Ejercicio cardiovascular fundamental.",
                imagen: "correr.jpg",
                series: 1,
                repeticiones: 1,
                tiempoActividad: 1800,
                tiempoDescanso: 0,
            },
            {
                id: 6,
                name: "Jumping Jacks",
                description: "Ejercicio para calentar todo el cuerpo.",
                imagen: "jumping_jacks.jpg",
                series: 3,
                repeticiones: 30,
                tiempoActividad: 30,
                tiempoDescanso: 30,
            },
            {
                id: 7,
                name: "Burpees",
                description: "Ejercicio intenso que combina cardio y fuerza.",
                imagen: "burpees.jpg",
                series: 3,
                repeticiones: 15,
                tiempoActividad: 40,
                tiempoDescanso: 60,
            },
            {
                id: 8,
                name: "Saltar la Cuerda",
                description: "Excelente ejercicio para mejorar la coordinación y resistencia.",
                imagen: "saltar_cuerda.jpg",
                series: 4,
                repeticiones: 1,
                tiempoActividad: 300,
                tiempoDescanso: 120,
            },
        ],
        borradologico: false,
    },
    {
        id: 3,
        name: "Flexibilidad y Movilidad",
        description: "Mejora tu flexibilidad y movilidad con estos ejercicios.",
        precio: 19.99,
        imagen: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/03/11/15523046827096.jpg",
        categoria: "Flexibilidad",
        ejercicios: [
            {
                id: 9,
                name: "Estiramiento de Piernas",
                description: "Estiramiento para mejorar la flexibilidad en las piernas.",
                imagen: "estiramiento_piernas.jpg",
                series: 3,
                repeticiones: 1,
                tiempoActividad: 60,
                tiempoDescanso: 30,
            },
            {
                id: 10,
                name: "Estiramiento de Espalda",
                description: "Ejercicio para mejorar la movilidad de la espalda.",
                imagen: "estiramiento_espalda.jpg",
                series: 3,
                repeticiones: 1,
                tiempoActividad: 60,
                tiempoDescanso: 30,
            },
            {
                id: 11,
                name: "Rotaciones de Cadera",
                description: "Ejercicio para aumentar la movilidad de las caderas.",
                imagen: "rotaciones_cadera.jpg",
                series: 3,
                repeticiones: 20,
                tiempoActividad: 30,
                tiempoDescanso: 30,
            },
            {
                id: 12,
                name: "Estiramiento de Hombros",
                description: "Mejora la flexibilidad de los hombros y evita lesiones.",
                imagen: "estiramiento_hombros.jpg",
                series: 3,
                repeticiones: 1,
                tiempoActividad: 60,
                tiempoDescanso: 30,
            },
        ],
        borradologico: false,
    },
    {
        id: 4,
        name: "Core y Abdominales",
        description: "Fortalece tu core y define tus abdominales con esta rutina.",
        precio: 22.99,
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJQcd1SecY8n1TyQpZGCRfZa-5z9Lqu8MLqA&s",
        categoria: "Core",
        ejercicios: [
            {
                id: 13,
                name: "Plank",
                description: "Ejercicio isométrico para fortalecer el core.",
                imagen: "plank.jpg",
                series: 4,
                repeticiones: 1,
                tiempoActividad: 60,
                tiempoDescanso: 60,
            },
            {
                id: 14,
                name: "Crunches",
                description: "Ejercicio básico para trabajar los abdominales.",
                imagen: "crunches.jpg",
                series: 4,
                repeticiones: 20,
                tiempoActividad: 30,
                tiempoDescanso: 45,
            },
            {
                id: 15,
                name: "Leg Raises",
                description: "Ejercicio para fortalecer los abdominales inferiores.",
                imagen: "leg_raises.jpg",
                series: 4,
                repeticiones: 15,
                tiempoActividad: 40,
                tiempoDescanso: 50,
            },
            {
                id: 16,
                name: "Russian Twists",
                description: "Ejercicio para trabajar los oblicuos.",
                imagen: "russian_twists.jpg",
                series: 3,
                repeticiones: 25,
                tiempoActividad: 45,
                tiempoDescanso: 60,
            },
        ],
        borradologico: false,
    },
];
