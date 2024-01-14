<script setup lang="ts">
//import { createPopper } from '@popperjs/core';
import TrendChart from './TrendChart/trend-chart';

let popper = null
let popperIsActive = false

const tooltipData = ref(null)
const trendo = ref(null)
const tooltip = ref(null)

const initPopper = () => {
  const chart = trendo.value;
  if (chart) {
    popper = createPopper(chart.$refs['active-line'], tooltip.value, {
      placement: "right",
      modifiers: {
        offset: { offset: "0,10" },
        preventOverflow: {
          boundariesElement: chart
        }
      }
    })
  }
}

const onMouseMove = (params) => {
  if (!props.loading) {
    popperIsActive = !!params;
    popper.update();
    tooltipData.value = params || null;
  }
}

const initChart = () =>  {
  if (!popper) {
    initPopper()
  }
  return true
}

export interface Props {
  datasets?: Array
  grid?: Object
  labels?: Object
  loading?: Boolean
}

const props = withDefaults(defineProps<Props>(),{
  datasets: [
    {
      data: [70, 100, 400, 180, 100, 300, 500],
      smooth: true,
      showPoints: true,
      fill: true,
      className: "curve1"
    },
    {
      data: [150, 300, 350, 100, 350, 100, 15],
      smooth: true,
      showPoints: true,
      className: "curve2"
    },
    {
      data: [50, 150, 200, 50, 120, 250, 200],
      smooth: true,
      showPoints: true,
      className: "curve3"
    }
  ],
  grid: {
      verticalLines: true,
      horizontalLines: true
    },
  labels: {
      xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      yLabels: 5,
      yLabelsTextFormatter: val => Math.round(val * 100) / 100
    },
  loading: false,
})


</script>


<template>
  <div class="flex items-center justify-center min-h-[240px] p-3 border-2 rounded-lg border-[#5555]" v-if="loading">
    <EosIconsThreeDotsLoading class="w-[4rem] h-[4rem] text-gray-500" />
  </div>
  <div class="chartgraph" v-else-if="!loading && (datasets[0].data.length > 1) && initChart()">
    <TrendChart
      :datasets="datasets"
      :grid="grid"
      :labels="labels"
      :min="0"
      padding="5"
      :interactive="true"
      @mouse-move="onMouseMove"
      class="trend"
      ref="trendo"
      v-if="datasets.length"
    />
    <div id="pop" role="tooltip" ref="tooltip" class="tooltip rounded-lg" :class="{'is-active': tooltipData}">
      <div class="tooltip-container" v-if="tooltipData">
        <strong>{{labels.xLabels[tooltipData.index]}}</strong>
        <div class="tooltip-data">
          <template v-for="(i, k) in tooltipData.data">
            <UBadge 
              color="gray" variant="solid" :label="i"
              :class="`tooltip-data-item tooltip-data-item--${k+1}`"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="border-2 border-gray-500 rounded-lg m-2 p-2 text-center max-w-[200px] mx-auto">
    <span class="text-primary-500 block py-0" v-if="labels.xLabels[0]">
      <span class="text-black dark:text-white">{{ labels.xLabels[0] }}: </span>
      <br>
      {{ datasets[0].data[0] }} people
    </span>
    <span class="text-gray-500 flex flex-col items-center border-2 rounded-lg m-2 p-2 max-w-[200px] mx-auto" v-else>
      <i class="i-tabler-question-circle h-14 w-14" />
      <span>No record</span>
    </span>
  </div>
</template>


<style>
.chartgraph {
  --c-1: rgb(var(--color-primary-300));
  --c-2: rgb(var(--color-primary-500));
  --c-3: rgb(var(--color-primary-900));
  width: 100%;

  .vtc {
    height: 250px;
    font-size: 12px;
    @media (min-width: 699px) {
      height: 320px;
    }
  }

  .grid line {
    stroke: var(--l40);
    stroke-width: .5;
  }
  .labels {
    stroke: currentColor;
  }
  .active-line {
    stroke: currentColor;
  }
  .point {
    stroke-width: 2;
    transition: stroke-width 0.2s;
  }
  .point.is-active {
    stroke-width: 5;
  }
  .curve1 {
    .stroke {
      stroke: var(--c-1);
      stroke-width: 2;
    }
    .fill {
      fill: var(--c-1);
      opacity: 0.1;
    }
    .point {
      fill: var(--c-1);
      stroke: var(--c-1);
    }
  }
  .curve2 {
    .stroke {
      stroke: var(--c-2);
      stroke-width: 2;
    }
    .point {
      fill: var(--c-2);
      stroke: var(--c-2);
    }
  }
  .curve3 {
    .stroke {
      stroke: var(--c-3);
      stroke-width: 2;
    }
    .point {
      fill: var(--c-3);
      stroke: var(--c-3);
    }
  }

  .tooltip {
    @apply text-[var(--l70)] bg-[var(--d80)] pointer-events-none p-2.5;

    &:not(.is-active) {
      display: none;
    }
    &-data {
      @apply flex;
      &-item {
        @apply flex items-center;
        &:not(:first-child) {
          margin-left: 20px;
        }
        &:before {
          @apply content-[""] block w-[15px] h-[15px] mr-[5px];
        }
        &--1:before {
          background: var(--c-1);
        }
        &--2:before {
          background: var(--c-2);
        }
        &--3:before {
          background: var(--c-3);
        }
      }
    }
  }
}
</style>
