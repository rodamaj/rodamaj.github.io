import type { LocalizedText, ThoughtEntry } from '~/types/content'

export const siteConfig = {
  identity: {
    name: 'Josué Amador-Rojas',
  },

  navigation: [
    {
      id: 'engineering',
      href: '/engineering',
      visible: true,
    },
    {
      id: 'science',
      href: '/science',
      visible: true,
    },
    {
      id: 'thoughts',
      href: '/thoughts',
      visible: false,
    },
    {
      id: 'music',
      href: '/music',
      visible: false,
    },
    {
      id: 'photography',
      href: '/photography',
      visible: true,
    },
  ],

  thoughts: {
    entries: [] as ThoughtEntry[],
  },

  music: {
    discogsUrl: 'https://www.discogs.com/user/rodamaj/collection',
    spotifyPlaylistUrl:
      'https://open.spotify.com/playlist/0Or6aZrSoLBdrAjcKgV5zY',
    recentEntries: [] as Array<{
      artist: string
      title: string
      note?: LocalizedText
    }>,
    returningEntries: [
      {
        artist: 'The Cure',
        title: 'Pornography',
        year: '1982',
        note: {
          es: 'Este disco fue, en su momento, lo más oscuro que había escuchado. Creo que lo sigue siendo. Es una experiencia sonora que no es necesariamente cómoda ni glamurosa; todo lo contrario. Te enseña que está bien que tu vida tenga un lado extraño, incomprendido o grotesco. Todo eso con un bajo increíble de fondo. “Cold” es mi favorita. Es tan fría como su título.',
          en: 'At the time, this record was the darkest thing I had ever heard. I think it still is. It is a sonic experience that is not necessarily comfortable or glamorous; quite the opposite. It teaches you that it is okay for your life to have a strange, misunderstood, or grotesque side. All of that with an incredible bass line in the background. “Cold” is my favorite. It is every bit as cold as its title.',
        },
      },
      {
        artist: 'Taylor Swift',
        title: 'Red',
        year: '2012',
        note: {
          es: 'Algo hermoso de crecer es darte cuenta de que todas las experiencias románticas que fracasaron tenían que pasar para ayudarte a madurar y entender qué quieres para tu futuro. Red es un álbum que relata todas esas etapas de enamoramiento, decepción, enojo, tristeza, resignación y esperanza con una mezcla de country y pop brillante, pegajosa, melancólica y dolorosa. Incluso a mi edad, muchas de estas letras todavía resuenan en mí. Y ni hablemos de la Taylor’s Version.',
          en: 'One of the beautiful things about growing older is realizing that every romantic experience that failed had to happen to help you mature and understand what you want for your future. Red is an album that chronicles all those stages of falling in love, disappointment, anger, sadness, resignation, and hope through a blend of country and pop that is bright, catchy, melancholic, and painful. Even at my age, many of these lyrics still resonate with me. And don’t even get me started on Taylor’s Version.',
        },
      },
      {
        artist: 'Beyoncé',
        title: 'Renaissance',
        year: '2022',
        note: {
          es: 'Renaissance llegó cuando la pandemia estaba terminando y nos llevó de nuevo a la pista de baile. A veces, cuando voy a clubes, ponen “Summer Renaissance” y todo se siente como un lugar seguro: no solo frente a la pandemia, sino también frente a los gobiernos tiranos que quieren oprimir a las comunidades vulnerables. Pero cada vez que pongo Renaissance, lo único que importa es moverme como si estuviera en pleno ballroom. Gracias por tanto, Bey.',
          en: 'Renaissance arrived as the pandemic was coming to an end and took us back to the dance floor. Sometimes, when I go out to clubs, they play “Summer Renaissance” and everything feels like a safe space: not only from the pandemic, but also from tyrannical governments that seek to oppress vulnerable communities. But whenever I put on Renaissance, the only thing that matters is moving as if I were in the middle of a ballroom. Thank you for everything, Bey.',
        },
      },
      {
        artist: 'Black Country, New Road',
        title: 'Ants from Up There',
        year: '2022',
        note: {
          es: 'Para mí, alguna vez el amor fue como ese avión supersónico: existió y voló de mi vida para siempre en un abrir y cerrar de ojos. El tema “Basketball Shoes” menciona a mi artista favorita, Charli(e), y también alguna vez dejé boronas en una cama porque el amor me hizo llevar el plato hasta ahí. ¿Otra razón para amar este álbum? Tal vez su instrumentación fuera de este mundo.',
          en: 'For me, love was once like that supersonic airplane: it existed and flew out of my life forever in the blink of an eye. The song “Basketball Shoes” mentions my favorite artist, Charli(e), and I too once left crumbs in a bed because love made me carry my plate all the way there. Another reason to love this album? Maybe its out-of-this-world instrumentation.',
        },
      },
      {
        artist: 'C. Tangana',
        title: 'El Madrileño',
        year: '2021',
        note: {
          es: 'No hay mucho que decir acá porque el idioma español lo expresa todo demasiado bien. Escúchenlo. Y vean el Tiny Desk. Ufff, joyita.',
          en: 'There is not much to say here because the Spanish language expresses everything far too well. Listen to it. And watch the Tiny Desk. Whew, what a gem.',
        },
      },
      {
        artist: 'Portugal. The Man',
        title: 'In the Mountain in the Cloud',
        year: '2011',
        note: {
          es: 'Debatí bastante entre incluir este disco o “The Black Parade” de MCR en esta selección, porque ambos me hacen sentir una melancolía hermosa que me cala hasta los huesos. Me decidí por el de Portugal. The Man porque tal vez menos personas lo han escuchado y hay que darle visibilidad. Recomiendo escucharlo cuando haga mucho frío y estén cuestionando su propia existencia y las políticas que mueven al mundo. Hermoso álbum.',
          en: 'I debated quite a bit between including this record or MCR’s “The Black Parade” in this selection, because both make me feel a beautiful melancholy that cuts to the bone. I chose the Portugal. The Man record because perhaps fewer people have heard it, and it deserves more visibility. I recommend listening to it when it is very cold and you are questioning your own existence and the politics that shape the world. Beautiful album.',
        },
      },
      {
        artist: 'Nirvana',
        title: 'In Utero',
        year: '1993',
        note: {
          es: 'RIP Kurt. Un visionario. Lo admiro muchísimo y le agradezco cada día haber creado, junto a su banda, este disco que me ha acompañado durante tanto tiempo. Lo que más me gusta es cómo se atrevió a hablar de problemas digestivos en “Milk It” y “Pennyroyal Tea” como nadie más lo ha hecho. Me identifico mucho. Ah, y “Dumb” podría ser mi canción favorita de todos los tiempos.',
          en: 'RIP Kurt. A visionary. I admire him deeply, and every day I am grateful to him for creating, alongside his band, this record that has stayed with me for so long. What I love most is how he dared to talk about digestive problems in “Milk It” and “Pennyroyal Tea” like no one else has. I relate so much. Oh, and “Dumb” might be my favorite song of all time.',
        },
      },
      {
        artist: 'Father John Misty',
        title: 'I Love You, Honeybear',
        year: '2015',
        note: {
          es: 'Creo que esta es una de las colecciones de canciones más hermosas que relatan las experiencias que puede vivir un hombre cuando se enamora. La voz de Father John Misty es hipnotizante y aquí está acompañada por una producción muy original en cada tema. “Strange Encounter” es, obviamente, mi canción en las apps de citas. “Holy Shit” hace volar mi pensamiento existencialista. Y siempre que suena “I Went to the Store One Day”, lloro. Soy humano.',
          en: 'I think this is one of the most beautiful collections of songs about the experiences a man can go through when he falls in love. Father John Misty’s voice is hypnotic, and here it is accompanied by highly original production on every track. “Strange Encounter” is obviously my song on dating apps. “Holy Shit” sends my existentialist thoughts soaring. And whenever “I Went to the Store One Day” plays, I cry. I’m human.',
        },
      },
    ],
  },
} as const
