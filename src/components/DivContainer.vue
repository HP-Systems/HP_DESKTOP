<template>
    <div class="container rounded-lg">
      <div class="grid">
        <div class="header antialiased font-extrabold ">
          <slot name="header" />
        </div>
        <div class="content">
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  
  .grid {
    width: 100%;
    max-width: auto; /* Ajusta según el tamaño máximo deseado */
    padding: 1rem;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 2rem; /* Espacio entre el header y el contenido */
  }
  
  .header {
    font-size: 2rem; /* Tamaño del título */    
    text-align: left;
    margin-left: 2rem;
  }
  
  .content {
    width: 100%;
  }
  </style>