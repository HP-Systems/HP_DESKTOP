<!-- <script setup>
const props = defineProps({
    reservation: {
        type: Object,
        required: true
    }
});
</script>
<template>
    <div class="w-5/6 grid grid-cols-3 grid-rows-[60px_1fr] bg-gray-100 rounded-lg">
        <div class="w-full col-span-3 h-[20vh] p-3">
            <AutoComplete :value="String(guest)" :show-propiertie="'nombre'" :placeholder="'Seleccionar Huesped'" :items="guests" @select="handleSelectedGuest" />
        </div>
        <div class="w-full col-span-3 p-3">
            <DataTable>
                <TableHead>
                <TR>
                    <TH>Nombre: {{ guest.nombre }}</TH>
                </TR>
                <TR>
                    <TH>Apellido: {{ guest.apellido }}</TH>
                </TR>
                <TR>
                    <TH>Email: {{ guest.email }}</TH>
                </TR>
                <TR>
                    <TH>Telefono: {{ guest.telefono }}</TH>
                </TR>
                </TableHead>
            </DataTable>
            <span v-if="errors.huespedID" class="text-red-500 text-xs mt-1 absolute">
                {{ errors.huespedID[0] }}
            </span>
        </div>
    </div>
</template> -->