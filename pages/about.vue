<template>  <TopNav />  <article id='about'>

<header>
  <h1><span class='grade'>Revolutionizing Transactions</span>: Harnessing Secure NFC Technology for Seamless Transactions</h1>

  <p>We’re stoked you’re here! Here’s some important info to get started.</p>

</header>

<hr>

<section id='double'>

  <article>

    <h2>About</h2>    
    <p>Our project is dedicated to harnessing the power of secure Near Field Communication (NFC) technology to transform the way transactions are conducted.</p>
    <p>By leveraging this cutting-edge technology, we aim to create a seamless and secure payment experience for users, enhancing convenience and safety in everyday financial interactions.</p>

    
    <h3>Why did we build this?</h3>

    <h4><UIcon name="i-heroicons-shield-check-20-solid"/> Enhanced Security</h4>
    <ul>
      <li>Robust layer of security</li>
      <li>Reducing the risk of fraud</li>
      <li>Reducing unauthorized access in transactions.</li>
    </ul>
    <h4><UIcon name="i-heroicons-rocket-launch-20-solid"/> Convenience</h4>
    <ul>
      <li>To simplify and expedite transactions</li>
      <li>Simplify payments and interactions</li>
      <li>Transaction efficiency.</li>
    </ul>
    <h4><UIcon name="i-heroicons-sparkles-20-solid"/> Future-Proofing</h4>
    <ul>
      <li>The forefront of digital payment trends.</li>
      <li>Ensuring that our project aligns with the evolving needs of the digital economy.</li>
    </ul>

    <p>Ultimately, this project was developed to bring together security, convenience, and innovation, offering users a safer and more efficient way to conduct transactions.</p>

    <hr>

    <h2>Getting started</h2>
    
    <h3>How it works</h3>
    <p>NFC-based mobile payment apps have revolutionized transactions. Users download the app, set up accounts, and link payment methods. These apps leverage NFC technology for contactless payments. </p>
    <p>During a transaction, users tap their NFC-enabled device on a terminal. security is ensured through encryption and user authorization, often via biometrics or a PIN. </p>
    <p>Confirmation and digital receipts follow, while optional features like peer-to-peer payments enhance utility. </p>
    <p>Users can manage their accounts within the app, providing a convenient, secure, and user-friendly payment experience.</p>

    <hr>

    <h2>Feedback</h2>
    <p>We are always looking for ways to improve our products and make them better. If you have any feedback, ideas or suggestions for this Figma Library, please reach out to us at <span class='text-red-700'>[aaaaaaaaaaaaaaaaaaaaaaaa]</span> or join our slack channel.</p>

  </article>
  
  <aside>
    <div>
      <h2>Creators</h2>
  
      <span>Built in partnership with the team at Algoplex</span>

      <hr>

      <UAlert
        title="James Francis Ga"
        description="Product Owner / Co-founder"
        :avatar="{ src: 'https://avatars.githubusercontent.com/u/49358080?v=4' }"
      />
      <UAlert
        title="Ryan Justine de Torres"
        description="Designer / Co-founder"
        :avatar="{ src: 'https://avatars.githubusercontent.com/u/128777590?v=4' }"
      />
    </div>
  </aside>

</section>

</article></template>



<style scoped>

#double {

  @apply flex justify-center h-full;

  flex-direction: var(--article-split-dir);

  > aside {
    @apply flex flex-col h-full px-[var(--article-aside-p)];
  }
}

aside > div {
  @apply bg-[var(--l30)] rounded-xl p-4 min-w-[340px];

  ::before {
    @apply m-0
  }
}


</style>