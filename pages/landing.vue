<script setup>

const $cfg = useAppConfig()

const u = ref($cfg.bannerTitleCardRef)
const m = ref($cfg.simpleTitleCardRef)
const mCards = ref([$cfg.smallAvatarCardRef])
const l = ref($cfg.bannerTitleCardRef)

const loading = ref(true)

onMounted(async () => {

  const init = await useCMSStore().getLanding()

  u.value = JSON.parse(init.find(x => x.type === 'upperLanding').value)
  m.value = JSON.parse(init.find(x => x.type === 'middleLanding').value)
  l.value = JSON.parse(init.find(x => x.type === 'lowerLanding').value)

  mCards.value = init.reduce((filter, item) => {
    const parsedValue = JSON.parse(item.value) || {};
    if (item.type === "middleLanding_card") {
      filter.push(parsedValue);
    }
    return filter;
  }, [])

  loading.value = false

})

</script>

<template>  <TopNav />  <article id='landing' class="flex flex-col" v-if="!loading">

<section id="top-section" class="text-white p-6 md:py-12 md:px-32 rounded-b-[4em]" 
  :style="{backgroundImage: `url(${$cfg.api.head}${u.imgurl})`}"
>
  <h1 class="p-3 text-4xl text-primary-700 dark:text-primary-400 bg-white dark:bg-black font-semibold mb-4 rounded-lg">
    {{ u.title }}
  </h1>

  <span class="p-1 mb-8 bg-primary-400 dark:bg-primary-900 mix-blend-difference rounded-lg">{{ u.subtitle }}</span>
  <span class="p-1 mb-8 text-gray-600 dark:text-gray-300 bg-white dark:bg-black rounded-lg">{{ u.description }}</span>

  <NuxtLink :to="u.btn_lnk" class="inline-block dark:bg-green-700 bg-green-500 text-white py-2 px-4 mt-8 rounded shadow transition duration-200 ease-in transform hover:-translate-x hover:scale-105">
    {{ u.btn_txt }}
  </NuxtLink>

</section>

<section id="middle-section" class="flex-grow relative overflow-hidden">
  <div class="container mx-auto px-6 pt-16 pb-12 z-10">

    <h1 class="text-5xl font-semibold mb-4 flex items-end justify-between gap-x-5 pb-8">
      <span>{{ m.title }}</span>
      <span class="text-gray-600 dark:text-gray-400 leading-relaxed text-xl">{{ m.subtitle }}</span>
    </h1>

    <div class="space-y-3 paragraphnopad">
      <template v-for="i in mCards">
        <ShopInfoCard :img="$cfg.api.head + i.imgurl" :name="i.title" :desc="i.subtitle" />
      </template>
    </div>

  </div>
</section>

<section id="bottom-section" class="pt-12 md:pt-24 rounded-t-[4rem] md:rounded-t-[10rem]">
  <div class="container mx-auto px-6 max-w-5xl w-full mx-auto">
    <h2 class="text-4xl font-semibold mb-6">{{ l.title }}</h2>
    <p class="mb-8 dark:text-gray-400 text-gray-600 leading-relaxed">{{ l.subtitle }}</p>
    <NuxtImg :src="$cfg.api.head + l.imgurl" class="mx-auto" />
    <NuxtLink :to="l.btn_lnk" class="inline-block bg-indigo-600 text-white py-2 px-4 mt-8 rounded shadow transition duration-200 ease-in transform hover:-translate-x hover:scale-105">
      {{ l.btn_txt }}
    </NuxtLink>
  </div>
</section>

<section id="wavey" >
  <div class='air air1'></div>
  <div class='air air2'></div>
  <div class='air air3'></div>
  <div class='air air4'></div>
</section>

</article></template>

<style scoped>

#landing-page {
  @apply min-h-screen;
}

#top-section {
  @apply flex flex-col items-center justify-center md:pt-20 md:pb-16;
}

#middle-section {
  @apply relative overflow-hidden md:flex;
  
  img {
    @apply absolute object-cover w-full h-full opacity-50 filter blur-sm z-0;
  }
  
}
#bottom-section,
#wavey {
  @apply dark:bg-primary-950 bg-primary-200
}

#top-section, #middle-section {
  @apply max-w-5xl w-full mx-auto;
  background-size: 50%;
  animation: panning 50s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-direction: alternate;
}

@keyframes panning {
from {background-position: 0 0}
to {background-position: 400% 400% }
}

#wavey{
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}
#wavey .air{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('/wave.png');
  background-size: 1000px 100px
}
#wavey .air.air1{
  animation: wave 30s linear infinite;
  z-index: 1000;
  opacity: 1;
  animation-delay: 0s;
  bottom: 0;
}
#wavey .air.air2{
  animation: wave2 15s linear infinite;
  z-index: 999;
  opacity: 0.5;
  animation-delay: -5s;
  bottom: 10px;
}
#wavey .air.air3{
  animation: wave 30s linear infinite;
  z-index: 998;
  opacity: 0.2;
  animation-delay: -2s;
  bottom: 15px;
}
#wavey .air.air4{
  animation: wave2 5s linear infinite;
  z-index: 997;
  opacity: 0.7;
  animation-delay: -5s;
  bottom: 20px;
}
@keyframes wave{
  0%{
    background-position-x: 0px; 
  }
  100%{
    background-position-x: 1000px; 
  }
}
@keyframes wave2{
  0%{
    background-position-x: 0px; 
  }
  100%{
    background-position-x: -1000px; 
  }
}

</style>