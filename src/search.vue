<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/toast'
import { ref } from 'vue'
import { Ref } from 'vue'

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
{ value: 'empty', label: ' ' },
{ value: 'earth', label: 'EARTH' },
  { value: 'fire', label: 'FIRE' },
  { value: 'water', label: 'WATER' },
  { value: 'wind', label: 'WIND' },
  { value: 'light', label: 'LIGHT' },
  { value: 'dark', label: 'DARK' },
]

const cardtypes = [
{ value: 'empty', label: ' ' },
{ value: 'Monster', label: 'Monster' },
  { value: 'Spell', label: 'Spell' },
  { value: 'Trap', label: 'Trap' },
]

const categories = [
{ value: 'empty', label: ' ' },
{ value: 'Effect', label: 'Effect' },
{ value: 'Ritual', label: 'Ritual' },
{ value: 'Synchro', label: 'Synchro' },
  { value: 'XYZ', label: 'XYZ' },
  { value: 'Fusion', label: 'Fusion' },
  { value: 'Link', label: 'Link' },
  { value: 'Pendulum', label: 'Pendulum' },
]

const abilities = [
{ value: 'empty', label: ' ' },
{ value: 'Gemini', label: 'Gemini' },
{ value: 'Tuner', label: 'Tuner' },
{ value: 'Spirit', label: 'Spirit' },
  { value: 'Union', label: 'Union' },
  { value: 'Non-Effect', label: 'Non-Effect' },
  { value: 'Toon', label: 'Toon' },
]

const types = {Monster: [
{ value: 'empty', label: ' ' },
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
], 
Spell: [
{ value: 'normal', label: 'Normal' },
  { value: 'continuous', label: 'Continuous' },
  { value: 'quick-play', label: 'Quick-Play' },
  { value: 'field', label: 'Field' },
  { value: 'equip', label: 'Equip' },
  { value: 'ritual', label: 'Ritual' },
],
Trap: [
{ value: 'normal', label: 'Normal' },
  { value: 'continuous', label: 'Continuous' },
  { value: 'counter', label: 'Counter'}
]};

type CardData = {
  name: string;
  attribute: string;
  image: string;
  effect: string;
  id: number;
  cardtype: string; 
  type: string; 
  level: string; 
  atk: number; 
  def: number; 
};
let cdata: Ref<CardData[]> = ref([]);

const { handleSubmit, setValues, values } = useForm()
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance();

const onSubmit = handleSubmit(async (values) => {

let queryString = ''
try {
  Object.entries(values).forEach(([key, value]) => {
    if (value) {
      if (typeof(value) === 'string'){
        if (value.includes('empty')){
      value = '';
        }
      }
      queryString += `${key}=${encodeURIComponent(value)}&`;
      
    }
  });
  queryString = queryString.slice(0, -1); // Remove trailing &
  const response = await fetch(`https://tmp-site-beta.vercel.app/search?${queryString}`, {
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

const linkArrows = ref<string[]>([]);

const toggleLinkArrow = (direction: string) => {
  const index = linkArrows.value.indexOf(direction);
  if (index !== -1) {
    linkArrows.value.splice(index, 1);
  } else {
    linkArrows.value.push(direction);
  }
  setValues({ linkArrows: linkArrows.value }); // Update form values
};
</script>

<template>
<div>
  <form class="space-y-3" @submit="onSubmit">
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
    <FormField name="Cardtype">
      <FormItem>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                class="ml-2 mt-2"
                variant="outline"
                role="combobox"
                :class="cn('w-[150px] justify-between', !values.cardtype && 'text-muted-foreground')"
              >
                {{ values.cardtype ? cardtypes.find(
                  (cardtype) => cardtype.value === values.cardtype,
                )?.label : 'Cardtype' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Cardtype" />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="cardtype in cardtypes"
                    :key="cardtype.value"
                    :value="cardtype.label"
                    @select="() => {
                      setValues({
                        cardtype: cardtype.value,
                      })
                    }"
                  >
                    <Check
                      :class="cn('mr-2 h-4 w-4', cardtype.value === values.cardtype ? 'opacity-100' : 'opacity-0')"
                    />
                    {{ cardtype.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="passcode">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Creator" v-bind="componentField" class="mt-2"/>
        </FormControl>
      </FormItem>
    </FormField>

    <Button type="submit" class="m-2">
      Search
    </Button>
  </Card>
  <Card v-if="(values.cardtype) && !(values.cardtype === 'empty')" class="flex flex-wrap m-2 pb-2 space-x-2">
    <FormField v-if="values.cardtype === 'Monster'" name="category">
      <FormItem>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                class="ml-2 mt-2"
                variant="outline"
                role="combobox"
                :class="cn('w-[150px] justify-between', !values.category && 'text-muted-foreground')"
              >
                {{ values.category ? categories.find(
                  (category) => category.value === values.category,
                )?.label : 'Category' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Category" />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="category in categories"
                    :key="category.value"
                    :value="category.label"
                    @select="() => {
                      setValues({
                        category: category.value,
                      })
                    }"
                  >
                    <Check
                      :class="cn('mr-2 h-4 w-4', category.value === values.category ? 'opacity-100' : 'opacity-0')"
                    />
                    {{ category.label }}
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-if="values.cardtype === 'Monster'" name="ability">
      <FormItem>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                class="ml-2 mt-2"
                variant="outline"
                role="combobox"
                :class="cn('w-[150px] justify-between', !values.ability && 'text-muted-foreground')"
              >
                {{ values.ability ? categories.find(
                  (ability) => ability.value === values.ability,
                )?.label : 'Ability' }}
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent class="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search Ability" />
              <CommandEmpty>Nothing found.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    v-for="ability in abilities"
                    :key="ability.value"
                    :value="ability.label"
                    @select="() => {
                      setValues({
                        ability: ability.value,
                      })
                    }"
                  >
                    <Check
                      :class="cn('mr-2 h-4 w-4', ability.value === values.ability ? 'opacity-100' : 'opacity-0')"
                    />
                    {{ ability.label }}
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
                class="mt-2 ml-2"
                variant="outline"
                role="combobox"
                :class="cn('w-[150px] justify-between', !values.type && 'text-muted-foreground')"
              >
                {{ values.type ? types[values.cardtype as keyof typeof types].find(
  (type) => type.value === values.type,
)?.label : 'Type' }}
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
                  v-for="type in types[values.cardtype as keyof typeof types]"
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
    <FormField v-if="values.cardtype === 'Monster'" name="attribute">
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
                )?.label : 'Attribute' }}
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
    <FormField v-if="values.cardtype === 'Monster'" v-slot="{ componentField }" name="level">
      <FormItem>
        <FormControl>
          <Input type="number" placeholder="Level/Rank/Link" v-bind="componentField" class="ml-2 mt-2 w-40" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-if="values.cardtype === 'Monster'" v-slot="{ componentField }" name="atk">
      <FormItem>
        <FormControl>
          <Input type="number" placeholder="ATK" v-bind="componentField" class="ml-2 mt-2 w-20" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField v-if="values.cardtype === 'Monster'" v-slot="{ componentField }" name="def">
      <FormItem>
        <FormControl>
          <Input type="number" placeholder="DEF" v-bind="componentField" class="ml-2 mt-2 w-20" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormItem v-if="values.cardtype === 'Monster'" label="Link Arrows">
  <Popover>
    <PopoverTrigger as-child>
      <Button class="mt-2 ml-2" variant="outline">
        Link Arrows
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[100px] p-0">
      <div class="grid grid-cols-3 gap-1">
        <button
          v-for="direction in ['top-left', 'top', 'top-right']"
          :key="direction"
          :class="{
            'bg-blue-500 text-white': values.linkArrows?.includes(direction),
            'bg-gray-200 hover:bg-gray-300': !values.linkArrows?.includes(direction),
          }"
          @click="toggleLinkArrow(direction)"
        >
          <p v-if="direction === 'top-left'">↖&#xFE0E;</p>
          <p v-if="direction === 'top'">↑</p>
          <p v-if="direction === 'top-right'">↗</p>
        </button>
        <button
          v-for="direction in ['left', 'middle', 'right']"
          :key="direction"
          :class="{
            'bg-blue-500 text-white': values.linkArrows?.includes(direction),
            'bg-gray-200 hover:bg-gray-300': !values.linkArrows?.includes(direction),
          }"
          @click="toggleLinkArrow(direction)"
        >
          <p v-if="direction === 'left'">←</p>
          <p v-if="direction === 'middle'"> </p>
          <p v-if="direction === 'right'">→</p>
        </button>
        <button
          v-for="direction in ['bottom-left', 'bottom', 'bottom-right']"
          :key="direction"
          :class="{
            'bg-blue-500 text-white': values.linkArrows?.includes(direction),
            'bg-gray-200 hover:bg-gray-300': !values.linkArrows?.includes(direction),
          }"
          @click="toggleLinkArrow(direction)"
        >
          <p v-if="direction === 'bottom-left'">↙</p>
          <p v-if="direction === 'bottom'">↓</p>
          <p v-if="direction === 'bottom-right'">↘&#xFE0E;</p>
        </button>
      </div>
    </PopoverContent>
  </Popover>
</FormItem>
  </Card>
  </form>
  
  <div v-if="cdata.length" class="flex flex-wrap">
  <div v-for="card in cdata" :key="card.id" class="flex shadow rounded overflow-hidden h-65 w-5/12 m-2">
    <img :src="card.image" alt="Card Image" class="w-1/3 h-full object-cover shrink-0" />
    <div class="w-2/3 px-2 py-1 flex flex-col justify-between">
      <div>
        <h4 class="text-sm font-medium">{{ card.name }}
          <br>
           {{ card.cardtype }} <h4 class="inline" v-if="card.attribute">{{ card.attribute.toUpperCase() }}</h4> <h4 class="inline" v-if="card.type.includes('XYZ')"> {{ 'Rank ' + card.level }}</h4><h4 class="inline" v-else-if="card.type.includes('LINK')"> {{ 'LINK-' + card.level }}</h4><h4 class="inline" v-else-if="card.level"> {{ 'Level ' + card.level }}</h4></h4>
        <h4 v-if="card.type" class="text-sm font-medium">{{ card.type.charAt(0).toUpperCase() + card.type.slice(1) }}</h4> 
        <p v-if"card.atk"> {{ card.atk + " ATK " }} <p class="inline" v-if"card.def">  {{ "/ " + card.def + " DEF" }} </p> </p>
        <p class="text-sm" style="white-space: pre-wrap"> {{ card.effect }}</p>
      </div>
    </div>
  </div>
</div>
</div>
<Toaster />

</template>