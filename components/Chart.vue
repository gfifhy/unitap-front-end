<script>
import { createPopper } from '@popperjs/core';
import TrendChart from './TrendChart/trend-chart';
export default {
  data() {
    return {
      tooltipData: null,
      popper: null,
      popperIsActive: false
    }
  },
  props: {
    datasets: {
      type: Array,
      default: [
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
    },
    grid: {
      type: Object,
      default: {
        verticalLines: true,
        horizontalLines: true
      },
    },
    labels: {
      type: Object,
      default: {
        xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        yLabels: 5,
        yLabelsTextFormatter: val => Math.round(val * 100) / 100
      },
    },
  },
  methods: {
    initPopper() {
      const chart = document.querySelector(".trend");
      const ref = chart.querySelector(".active-line");
      const tooltip = this.$refs.tooltip;
      this.popper = createPopper(ref, tooltip, {
        placement: "right",
        modifiers: {
          offset: { offset: "0,10" },
          preventOverflow: {
            boundariesElement: chart
          }
        }
      });
    },
    onMouseMove(params) {
      this.popperIsActive = !!params;
      this.popper.update();
      this.tooltipData = params || null;
    }
  },
  mounted() {
    this.initPopper();
  }
};
</script>


<template>
  <div class="chartgraph">
    <TrendChart
      :datasets="datasets"
      :grid="grid"
      :labels="labels"
      :min="0"
      padding="5"
      :interactive="true"
      @mouse-move="onMouseMove"
      class="trend"
      v-if="datasets.length"
    ></TrendChart>
    <div id="pop" role="tooltip" ref="tooltip" class="tooltip" :class="{'is-active': tooltipData}">
      <div class="tooltip-container" v-if="tooltipData">
        <strong>{{labels.xLabels[tooltipData.index]}}</strong>
        <div class="tooltip-data">
          <div class="tooltip-data-item tooltip-data-item--1">{{tooltipData.data[0]}}</div>
          <div class="tooltip-data-item tooltip-data-item--2">{{tooltipData.data[1]}}</div>
          <div class="tooltip-data-item tooltip-data-item--3">{{tooltipData.data[2]}}</div>
        </div>
      </div>
    </div>
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
