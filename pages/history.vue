<script setup>

definePageMeta({ 
  middleware: ['signed-out'],
})

const history = [
  {
    date: 'Today, November 20, 2024',
    type: 'receive',
    agent: 'Koya Wel',
    amount: 'Jacket',
    avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fphilnews.ph%2Fwp-content%2Fuploads%2F2019%2F01%2Fwillie-revillame.jpg&f=1&nofb=1&ipt=bc42b525157f6bb5cb7efbd1a03ae9a2708150678d94cb424f62870e13dbd1f8&ipo=images',
  },
  {
    date: 'Yesterday, November 19, 2024',
    type: 'receive',
    agent: 'Goku',
    amount: 'php 245,624,621',
    avatar: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcomicvine.gamespot.com%2Fa%2Fuploads%2Foriginal%2F11127%2F111273739%2F5466597-1690314105-goku_.png&f=1&nofb=1&ipt=163038a3854b682c2e4e71c8261d7e57432c1abe1be28532c6c3ca049de07437&ipo=images',
  },
  {
    date: 'Never',
    type: 'receive',
    agent: 'Sara Duterte',
    amount: 'php 2.1B',
    avatar: 'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fsa.kapamilya.com%2Fabsnews%2Fabscbnnews%2Fmedia%2Fnews-special1%2Flifestyle%2F6%2F28%2Findaysara.jpg&f=1&nofb=1&ipt=c9259f1902f39c41dfe69552c64129ae65e50257e35ebf93384cacc1892afd71&ipo=images',
  },
]

</script>


<template><div id='history'>

<section id="actions">

  <div>
    <h3>History</h3>
  </div>

  <div class="buttons">
    <UButton variant="soft" label="Export to PDF"
      icon="i-heroicons-arrow-down-on-square-stack-20-solid"
      @click=""/>
    <UInput
      placeholder="Search..." class="m-0 p-0 h-10" id="search"
      icon="i-heroicons-magnifying-glass-20-solid" size="md"
      :trailing="false"
    />
  </div>

</section>


<section class="max-w-3xl mx-auto px-4">

  <UCard class="history" v-for="i in history">
    <div class="item">
      <section>
        <div>
          <UAvatar size="sm" :src="i.avatar"/>
          <UIcon id='icon' :name="i.type === 'receive' ? 'i-heroicons-banknotes-20-solid' : ''" />
        </div>
        <div>
          <section><span>{{ i.type === 'receive' ? 'Payment from' : '' }} <b>{{ i.agent }}</b></span></section>
          <section>{{ i.date }}</section>
        </div>
      </section>
      <section>
        {{ i.amount }}
      </section>
    </div>
  </UCard>
</section>


</div></template>


<style scoped>

#actions {
  @apply flex flex-wrap;
}

#actions {
  
  @apply items-center justify-between;
  
  div {

    @apply flex items-center gap-x-4 m-1 pl-2 pr-2;

    button {
      @apply ml-2;
    }
  }

}

:deep(.history) {
  @apply mb-4;

  > div {
    @apply p-3
  }

  .item {
    @apply flex flex-wrap items-center justify-between;
    
    section {
      @apply flex flex-row items-center;

      div {
        @apply flex flex-col;

        section {
          &:nth-child(1) {
            @apply flex items-center;
          }
          &:nth-child(2) {
            @apply flex items-center text-[gray];
          }
        }

      }

      div:nth-of-type(1) {
        @apply flex flex-row items-center;
      }

      #icon {
        width: 50px;
        height: 20px;
      }
    
    }

    > section:nth-of-type(2) {
      @apply justify-end w-[var(--amnt-l)]
    }
  }
}

:deep(#search + span) {
  padding-inline-start: 1.15rem;
}

@media only screen and (max-width: 520px) {
  :deep(.history) {
    --amnt-l: 100%;
  }
}

</style>