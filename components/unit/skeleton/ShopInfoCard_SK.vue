<template>

<div class="w-full pointer-events-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg" role="status">
  <div class="relative overflow-hidden rounded-lg ring-1 ring-gray-200 dark:ring-gray-800">
    <div class="p-4">
      <div class="flex gap-3 items-start">
        <span class="relative inline-flex items-center justify-center flex-shrink-0 rounded-full h-20 w-20 text-3xl"><USkeleton class="rounded-full h-20 w-20 text-3xl" /></span>
        <div class="w-0 flex-1">
          <USkeleton class="w-[60%] h-7 font-medium" />
          <USkeleton class="w-[90%] h-5 mt-1 leading-4" />
        </div>
      </div>
    </div>
  </div>
</div>

</template>