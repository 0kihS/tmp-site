<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/toast'
import { ref } from 'vue'

const emit = defineEmits<{(data: any[]): void}>()
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const attributes = [
{ value: 'earth', label: 'EARTH' },
  { value: 'fire', label: 'FIRE' },
  { value: 'water', label: 'WATER' },
  { value: 'wind', label: 'WIND' },
  { value: 'light', label: 'LIGHT' },
  { value: 'dark', label: 'DARK' },
]

const types = [
  { value: "aqua", label: "Aqua" },
  { value: "beast", label: "Beast" },
  { value: "beast-warrior", label: "Beast-Warrior" },
  { value: "cyberse", label: "Cyberse" },
  { value: "dinosaur", label: "Dinosaur" },
  { value: "divine-beast", label: "Divine-Beast" },
  { value: "dragon", label: "Dragon" },
  { value: "fairy", label: "Fairy" },
  { value: "fiend", label: "Fiend" },
  { value: "fish", label: "Fish" },
  { value: "insect", label: "Insect" },
  { value: "machine", label: "Machine" },
  { value: "plant", label: "Plant" },
  { value: "psychic", label: "Psychic" },
  { value: "pyro", label: "Pyro" },
  { value: "reptile", label: "Reptile" },
  { value: "rock", label: "Rock" },
  { value: "sea serpent", label: "Sea Serpent" },
  { value: "spellcaster", label: "Spellcaster" },
  { value: "thunder", label: "Thunder" },
  { value: "warrior", label: "Warrior" },
  { value: "winged-beast", label: "Winged-Beast" },
  { value: "wyrm", label: "Wyrm" },
  { value: "zombie", label: "Zombie" }
];

let cdata = ref([{name: "test", attribute: "fire", image: "img", effect: "i like sharks :3", id: 1, cardtype: "", type: "", level: ''}])

const { handleSubmit, setValues, values } = useForm()
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();

const onSubmit = handleSubmit(async (values) => {

let queryString = ''
try {
  Object.entries(values).forEach(([key, value]) => {
    if (value) {
      queryString += `${key}=${encodeURIComponent(value)}&`;
    }
  });
  queryString = queryString.slice(0, -1); // Remove trailing &
  const response = await fetch(`https://mechanical-mokey-backend.onrender.com/search?${queryString}`, {
    method: 'GET',
    // Dynamically create query parameters based on form values:
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  // Handle the retrieved card data here, for example:
  
  cdata = ref(await response.json());
  
  console.log(cdata);
  instance?.proxy?.$forceUpdate();
} catch (error) {
  // Handle errors gracefully, for example:
  console.error(error); // Log the error for now
  // You might want to display an error message to the user
}
});
</script>

<template>
<div>
  <form class="space-y-6" @submit="onSubmit">
    <Card class="flex flex-wrap m-2 space-x-2">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Name" v-bind="componentField" class="m-2" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="effect">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Effect" v-bind="componentField" class="m-2" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="level">
      <FormItem>
        <FormControl>
          <Input type="number" placeholder="Level" v-bind="componentField" class="m-2" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField name="attribute">
      <FormItem>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                class="ml-2 mt-2"
                variant="outline"
                role="combobox"
                :class="cn('w-[150px] justify-between', !values.attribute && 'text-muted-foreground')"
              >
                {{ values.attribute ? attributes.find(
                  (attribute) => attribute.value === values.attribute,
                )?.label : 'Attribute:' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Attribute" />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="attribute in attributes"
                    :key="attribute.value"
                    :value="attribute.label"
                    @select="() => {
                      setValues({
                        attribute: attribute.value,
                      })
                    }"
                  >
                    <Check
                      :class="cn('mr-2 h-4 w-4', attribute.value === values.attribute ? 'opacity-100' : 'opacity-0')"
                    />
                    {{ attribute.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField name="type">
      <FormItem>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                class="mt-2"
                variant="outline"
                role="combobox"
                :class="cn('w-[150px] justify-between', !values.type && 'text-muted-foreground')"
              >
                {{ values.type ? types.find(
                  (type) => type.value === values.type,
                )?.label : 'Type:' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Type" />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="type in types"
                    :key="type.value"
                    :value="type.label"
                    @select="() => {
                      setValues({
                        type: type.value,
                      })
                    }"
                  >
                    <Check
                      :class="cn('mr-2 h-4 w-4', type.value === values.type ? 'opacity-100' : 'opacity-0')"
                    />
                    {{ type.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="m-2">
      Search
    </Button>
  </Card>
  </form>
  
  <div v-if="cdata.length" class="flex flex-wrap">
  <div v-for="card in cdata" :key="card.id" class="flex shadow rounded overflow-hidden h-65 w-5/12 m-2">
    <img :src="card.image" alt="Card Image" class="w-1/3 h-full object-cover shrink-0" />
    <div class="w-2/3 px-2 py-1 flex flex-col justify-between">
      <div>
        <h4 class="text-sm font-medium">{{ card.name }}
          <br>
           {{ card.cardtype }} {{ card.attribute }} <h4 class="inline" v-if="parseInt(card.level) > 0"> {{ 'Level ' + card.level }}</h4></h4>
        <h4 class="text-sm font-medium">{{ card.type }}</h4> 
        <p class="text-sm"> {{ card.effect }}</p>
      </div>
    </div>
  </div>
</div>
</div>
<Toaster />

</template>
