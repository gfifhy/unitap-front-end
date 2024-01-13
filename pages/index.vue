<script setup>

definePageMeta({ 
  middleware: ['signed-out', 'guard-panel', 'admin-panel'],
})

const loading = ref(true)

const role = ref('student')
const recents = ref(null)
const gloss = ref(null)

const account_info = ref([])

const transactIcon = v => {
  switch (v) {
  case 'send':
    return 'i-tabler-arrow-big-left'
  case 'receive':
    return'i-tabler-arrow-big-right-filled'
  default:
    return 'i-heroicons-banknotes-20-solid'
  }
}

onMounted(async () => {
  const account = useAuthStore()
  role.value = account.user?.role.slug

  recents.value = await useWalletStore().getRecentTransactions(role.value)

  const res = await useAnalyticsStore().getGloss()
  console.log(res)
  gloss.value = {
    datasets: buildGraphDataSets([res.orders, res.transactions]),
    grid: {
      verticalLines: true,
      horizontalLines: true
    },
    labels: {
      xLabels: res.labels,
      yLabels: 5,
      yLabelsTextFormatter: val => Math.round(val * 100) / 100
    }
  }

  account_info.value = [
    {
    '‏': 'Type',
    '‎': account.user?.role.name,
    },
    {
    '‏': 'Status',
    '‎': account.identity?.wallet?.isDisabled ? 'Disabled' : 'Active',
    },
    {
    '‏': 'Balance',
    '‎': '₱' + (account.identity?.wallet?.balance || '0'),
    },
  ]
  if (role.value !== 'admin' && role.value !== 'store') {
    account_info.value.unshift({
      '‏': 'Number',
      '‎': account.identity?.student?.student_id || '',
    })

  }

  loading.value = false
})


</script>


<template>  <TopNav />  <div id='dashboard'>

  <section id="actions">

    <div>
      <h3>Dashboard</h3>
    </div>

    <div class="buttons">
      <ButtonTooltip text="Export to PDF" hotkey="E" variant="soft"
        icon="i-heroicons-arrow-down-on-square-stack-20-solid" 
        @click="" v-if="false" />
      <UButton variant="solid" label="Top Up"
        icon="i-heroicons-paper-airplane-20-solid"
        @click="navigateTo('/transact')"
        v-if="role == 'admin'" />
    </div>

  </section>


  <section id="board">

    <div class="account-info">
      <h4>Account</h4>
      <UTable
        :loading="loading"
        :loading-state="{ icon: 'i-heroicons-arrow-path-20-solid',
          label: 'Loading...' }"
        :rows="account_info" />
    </div>

    <div class="stats">

      <section id="actions">
        <div><h4>Statistics</h4></div>
        <!--div class="buttons">
          <UButton variant="ghost" label="View all"
            trailingIcon="i-heroicons-chart-pie"
            @click=""/>
        </div-->
      </section>

      <template v-if="gloss">
        <Chart :datasets="gloss.datasets" :grid="gloss.grid" :labels="gloss.labels" />
        <div id="legend">
          <span>Orders<i class="text-primary-300" /></span>
          <span>Transfers<i class="text-primary-500" /></span>
        </div>
      </template>

      <section id="actions">
        <div><h4>Recent Transactions</h4></div>
        <div class="buttons">
          <UButton variant="ghost" label="View all"
            trailingIcon="i-heroicons-archive-box"
            @click="navigateTo('/history')"/>
        </div>
      </section>

      <UCard class="history" v-for="i in recents">
        <div class="item">
          <section>
            <div>
              <UAvatar id="avatar" size="sm" :src="i.avatar"/>
              <UIcon id='icon' :name="transactIcon(i.type)" />
            </div>
            <div>
              <section><span>Payment {{ i.type === 'receive' ? 'from' : 'to' }} <b>{{ i.agent }}</b></span></section>
              <section>{{ relativeTime(i.date)[0] }}</section>
            </div>
          </section>
          <section>
            ₱{{ i.amount }}
          </section>
        </div>
      </UCard>

    </div>

  </section>


</div></template>


<style scoped>

#actions,
#board {
  @apply flex flex-wrap;
}

#actions {
  
  @apply items-center justify-between;
  
  div {

    @apply m-1 pl-2 pr-2;

    button {
      @apply ml-2;
    }
  }

}

#board {
  @apply max-w-7xl mx-auto
}

.account-info {

  @apply flex-1 min-w-[200px] box-border m-2.5 p-2.5;

  :deep(thead) {
    display: none;
  }
  
  :deep(tr > td:nth-child(2)) {
      @apply text-right text-[rgb(var(--color-primary-500))]
    }

}

.stats {
  @apply flex-[2] box-border m-2.5 p-2.5;
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
  }
}

@media (max-width: 768px) {
  #board {
    @apply flex-col;
  }
  .account-info,
  .stats {
    @apply flex-1;
  }
}

</style>