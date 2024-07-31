export enum Dificultad {
  INICIAL = 'inicial',
  INTERMEDIO = 'intermedio',
  AVANZADO = 'avanzado',
  PROFESIONAL = 'profesional',
}

export interface IRutina {
  id: number;
  name: string;
  description: string;
  precio?: number;
  imagen?: string;
  category: string;
  difficultyLevel: Dificultad;
  exercise: IRutinaEjercicio[];
}

export interface IRutinaEjercicio {
  id: number;
  titulo: string;
  description: string;
  imgUrl: string[] | null;
  videoUrl: string | null;
}

export const rutinas: IRutina[] = [
  {
    id: 1,
    name: "Fuerza Total",
    description: "Una rutina completa para aumentar la fuerza en todo el cuerpo.",
    precio: 29.99,
    imagen: "https://media.gq.com.mx/photos/625db17471f363f634bce022/master/pass/ejercicio-1388957838.jpg",
    category: "Fuerza",
    difficultyLevel: Dificultad.AVANZADO,
    exercise: [
      {
        id: 1,
        titulo: "Sentadillas",
        description: "Ejercicio para fortalecer piernas y glúteos.",
        imgUrl: ["https://images.pexels.com/photos/5038833/pexels-photo-5038833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/7vw9c8dIAko?si=fAb38tbXZEfS8kPf",
      },
      {
        id: 2,
        titulo: "Press de Banca",
        description: "Ejercicio para desarrollar el pecho, hombros y tríceps.",
        imgUrl: ["https://images.pexels.com/photos/4853675/pexels-photo-4853675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/BjixzWEw4EY?si=Sndbjuh7RQBLh5Ct",
      },
      {
        id: 3,
        titulo: "Peso Muerto",
        description: "Ejercicio compuesto que trabaja la cadena posterior.",
        imgUrl: ["https://images.pexels.com/photos/14623740/pexels-photo-14623740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/jlFl7WJ1TzI?si=ipTQlJj8y6UbGmwi",
      },
      {
        id: 4,
        titulo: "Dominadas",
        description: "Ejercicio para la espalda y los brazos.",
        imgUrl: ["https://images.pexels.com/photos/7672101/pexels-photo-7672101.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/BjixzWEw4EY?si=Sndbjuh7RQBLh5Ct",
      },
    ],
  },
  {
    id: 2,
    name: "Resistencia Cardio",
    description: "Mejora tu resistencia cardiovascular con estos ejercicios.",
    precio: 24.99,
    imagen: "https://i0.wp.com/blog.smartfit.com.mx/wp-content/uploads/2018/04/cuando-cambiar-rutina-del-gym.jpg?fit=1200%2C675&ssl=1",
    category: "Cardio",
    difficultyLevel: Dificultad.INTERMEDIO,
    exercise: [
      {
        id: 5,
        titulo: "Correr",
        description: "Ejercicio cardiovascular fundamental.",
        imgUrl: ["https://images.pexels.com/photos/10082285/pexels-photo-10082285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/BjixzWEw4EY?si=Sndbjuh7RQBLh5Ct",
      },
      {
        id: 6,
        titulo: "Jumping Jacks",
        description: "Ejercicio para calentar todo el cuerpo.",
        imgUrl: ["https://images.pexels.com/photos/8401103/pexels-photo-8401103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/jlFl7WJ1TzI?si=ipTQlJj8y6UbGmwi",
      },
      {
        id: 7,
        titulo: "Burpees",
        description: "Ejercicio intenso que combina cardio y fuerza.",
        imgUrl: ["https://media.istockphoto.com/id/1419462881/es/foto/gu%C3%ADa-de-una-joven-para-hacer-ejercicios-correctos-de-burpee.jpg?b=1&s=612x612&w=0&k=20&c=FRVzUO5Lkie6BmJ2u5ugmJJKmDpw8Hv3GKtJ6dF9w00="],
        videoUrl: "https://www.youtube.com/embed/BjixzWEw4EY?si=Sndbjuh7RQBLh5Ct",
      },
      {
        id: 8,
        titulo: "Saltar la Cuerda",
        description: "Excelente ejercicio para mejorar la coordinación y resistencia.",
        imgUrl: ["https://images.pexels.com/photos/8846581/pexels-photo-8846581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/jlFl7WJ1TzI?si=ipTQlJj8y6UbGmwi",
      },
    ],
  },
  {
    id: 3,
    name: "Flexibilidad y Movilidad",
    description: "Mejora tu flexibilidad y movilidad con estos ejercicios.",
    precio: 19.99,
    imagen: "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2019/03/11/15523046827096.jpg",
    category: "Flexibilidad",
    difficultyLevel: Dificultad.INICIAL,
    exercise: [
      {
        id: 9,
        titulo: "Estiramiento de Piernas",
        description: "Estiramiento para mejorar la flexibilidad en las piernas.",
        imgUrl: ["https://images.pexels.com/photos/4720287/pexels-photo-4720287.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/BjixzWEw4EY?si=Sndbjuh7RQBLh5Ct",
      },
      {
        id: 10,
        titulo: "Estiramiento de Espalda",
        description: "Ejercicio para mejorar la movilidad de la espalda.",
        imgUrl: ["https://images.pexels.com/photos/6697170/pexels-photo-6697170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/jlFl7WJ1TzI?si=ipTQlJj8y6UbGmwi",
      },
      {
        id: 11,
        titulo: "Rotaciones de Cadera",
        description: "Ejercicio para aumentar la movilidad de las caderas.",
        imgUrl: ["https://images.pexels.com/photos/6697186/pexels-photo-6697186.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/BjixzWEw4EY?si=Sndbjuh7RQBLh5Ct",
      },
      {
        id: 12,
        titulo: "Estiramiento de Hombros",
        description: "Mejora la flexibilidad de los hombros y evita lesiones.",
        imgUrl: ["https://images.pexels.com/photos/6798415/pexels-photo-6798415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/jlFl7WJ1TzI?si=ipTQlJj8y6UbGmwi",
      },
    ],
  },
  {
    id: 4,
    name: "Core y Abdominales",
    description: "Fortalece tu core y define tus abdominales con esta rutina.",
    precio: 22.99,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJQcd1SecY8n1TyQpZGCRfZa-5z9Lqu8MLqA&s",
    category: "Core",
    difficultyLevel: Dificultad.INTERMEDIO,
    exercise: [
      {
        id: 13,
        titulo: "Plank",
        description: "Ejercicio isométrico para fortalecer el core.",
        imgUrl: ["https://images.pexels.com/photos/3768901/pexels-photo-3768901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/BjixzWEw4EY?si=Sndbjuh7RQBLh5Ct",
      },
      {
        id: 14,
        titulo: "Crunches",
        description: "Ejercicio básico para trabajar los abdominales.",
        imgUrl: ["https://images.pexels.com/photos/3076516/pexels-photo-3076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/jlFl7WJ1TzI?si=ipTQlJj8y6UbGmwi",
      },
      {
        id: 15,
        titulo: "Leg Raises",
        description: "Ejercicio para fortalecer los abdominales inferiores.",
        imgUrl: ["https://images.pexels.com/photos/6455938/pexels-photo-6455938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/BjixzWEw4EY?si=Sndbjuh7RQBLh5Ct",
      },
      {
        id: 16,
        titulo: "Russian Twists",
        description: "Ejercicio para trabajar los oblicuos.",
        imgUrl: ["https://images.pexels.com/photos/5262853/pexels-photo-5262853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"],
        videoUrl: "https://www.youtube.com/embed/jlFl7WJ1TzI?si=ipTQlJj8y6UbGmwi",
      },
    ],
  },
];
