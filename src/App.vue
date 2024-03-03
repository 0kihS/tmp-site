<script setup lang="ts">
import { useForm } from 'vee-validate'
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

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

const { handleSubmit, setValues, values } = useForm()
const onSubmit = handleSubmit(async (values) => {

  let queryString = ''
  try {
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        queryString += `${key}=${encodeURIComponent(value)}&`;
      }
    });
    queryString = queryString.slice(0, -1); // Remove trailing &
    console.log(values);
    const response = await fetch(`https://mechanical-mokey-backend.onrender.com/search?${queryString}`, {
      method: 'GET',
      // Dynamically create query parameters based on form values:
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // Handle the retrieved card data here, for example:
    
    let cdata = await response.json()
    
    console.log(cdata);

  } catch (error) {
    // Handle errors gracefully, for example:
    console.error(error); // Log the error for now
    // You might want to display an error message to the user
  }
});

</script>

<template>

  <form class="space-y-6" @submit="onSubmit">
    <Card class="flex flex-wrap m-2 space-x-2">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormControl>
          <Input type="text" placeholder="Name" v-bind="componentField" class="m-2" />
        </FormControl>
      </FormItem>
    </FormField>
    <FormField name="attribute">
      <FormItem>
        <Popover>
          <PopoverTrigger as-child>
            <FormControl>
              <Button
                class="m-2"
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
    <Button type="submit" class="m-2">
      Search
    </Button>
  </Card>
  </form>

<Toaster />

</template>
