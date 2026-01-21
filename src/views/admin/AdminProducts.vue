<template>
  <AdminLayout>
    <div class="grid gap-10 lg:grid-cols-12">
      <!-- Product Form -->
      <div
        class="lg:col-span-4 bg-[#1E293B] p-8 rounded-[2.5rem] border border-slate-800 h-fit sticky top-10"
      >
        <h3 class="mb-6 text-xl font-black">
          {{ isEditing ? 'Edit Product' : 'Add Product' }}
        </h3>
        <div class="space-y-4">
          <input
            v-model="form.name"
            placeholder="Product Name"
            class="w-full bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm"
          />
          <input
            v-model="form.slug"
            placeholder="Product Slug (optional)"
            class="w-full bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-xs text-slate-400"
          />
          <div class="grid grid-cols-2 gap-4">
            <input
              v-model.number="form.price"
              type="number"
              placeholder="Price"
              class="bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm"
            />
            <input
              v-model.number="form.stock"
              type="number"
              placeholder="Stock"
              class="bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm"
            />
          </div>
          <textarea
            v-model="form.description"
            placeholder="Product Description"
            class="w-full bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm resize-none h-24"
          ></textarea>
          <input
            v-model="form.image_url"
            placeholder="Image URL"
            class="w-full bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm"
          />

          <!-- Category Selection -->
          <div class="space-y-2">
            <label class="block text-xs font-bold tracking-wide uppercase text-slate-400">
              Select Category
            </label>
            <div class="flex gap-2">
              <select
                v-model.number="form.category_id"
                class="flex-1 bg-[#0F172A] border border-slate-700 rounded-2xl p-4 text-sm"
              >
                <option :value="null">-- Choose a category --</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.name }}
                </option>
              </select>
              <button
                @click="showNewCategoryForm = !showNewCategoryForm"
                class="px-4 py-2 text-xs font-bold transition-all bg-slate-700 hover:bg-slate-600 rounded-2xl"
                title="Add new category"
              >
                +
              </button>
            </div>
          </div>

          <!-- New Category Form (Toggle) -->
          <div
            v-if="showNewCategoryForm"
            class="p-4 bg-[#0F172A] rounded-2xl border border-slate-700 space-y-3"
          >
            <label class="block text-xs font-bold uppercase text-slate-400">
              Create New Category
            </label>
            <input
              v-model="newCategoryName"
              placeholder="Category Name"
              class="w-full bg-[#1E293B] border border-slate-600 rounded-xl p-3 text-sm"
            />
            <div class="flex gap-2">
              <button
                @click="handleAddCategory"
                class="flex-1 px-4 py-2 text-xs font-bold text-white transition-all bg-emerald-600 hover:bg-emerald-500 rounded-xl"
              >
                Create & Select
              </button>
              <button
                @click="showNewCategoryForm = false"
                class="flex-1 px-4 py-2 text-xs font-bold text-white transition-all bg-slate-700 hover:bg-slate-600 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>

          <button
            @click="handleSubmit"
            :disabled="!form.category_id || loading"
            class="w-full py-4 font-black text-white transition-all bg-indigo-600 shadow-lg rounded-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? '...' : isEditing ? 'Update' : 'Add' }} Product
          </button>
          <button
            v-if="isEditing"
            @click="resetForm"
            class="w-full py-2 font-bold transition-all text-slate-400 hover:text-white"
          >
            Cancel Edit
          </button>
        </div>
      </div>

      <!-- Products List -->
      <div class="space-y-4 lg:col-span-8">
        <div
          v-if="products.length === 0"
          class="bg-[#1E293B] p-20 rounded-[2.5rem] text-center border border-dashed border-slate-700 text-slate-500 font-bold"
        >
          No products found.
        </div>
        <div
          v-for="p in products"
          :key="p.id"
          class="bg-[#1E293B] p-4 rounded-[2rem] border border-slate-800 flex items-center justify-between group transition-all hover:border-slate-600"
        >
          <div class="flex items-center gap-5">
            <img :src="p.image_url" class="object-cover w-16 h-16 rounded-2xl bg-slate-900" />
            <div>
              <h4 class="text-lg font-bold text-white">{{ p.name }}</h4>
              <div class="flex gap-3">
                <p class="text-[10px] font-black text-slate-500 uppercase">${{ p.price }}</p>
                <p
                  :class="p.stock < 5 ? 'text-red-500' : 'text-slate-500'"
                  class="text-[10px] font-black uppercase"
                >
                  Stock: {{ p.stock }}
                </p>
              </div>
            </div>
          </div>
          <div class="flex gap-2 pr-4 transition-all opacity-0 group-hover:opacity-100">
            <button @click="handleEdit(p)" class="p-2 text-xs font-bold text-indigo-400">
              Edit
            </button>
            <button @click="handleDelete(p.id)" class="p-2 text-xs font-bold text-red-500">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import AdminLayout from './AdminLayout.vue'
import { useAdminData } from '../../composables/useAdminData'
import type { Product } from '../../composables/useAdminData'

const { products, categories, loading, fetchData, deleteProduct, saveProduct, addCategory } =
  useAdminData()

const isEditing = ref(false)
const editingId = ref<number | null>(null)
const showNewCategoryForm = ref(false)
const newCategoryName = ref('')

const defaultForm = {
  name: '',
  price: 0,
  image_url: '',
  description: '',
  slug: '',
  category_id: null as number | null,
  stock: 10,
}

const form = ref({ ...defaultForm })

const resetForm = () => {
  form.value = { ...defaultForm }
  isEditing.value = false
  editingId.value = null
  showNewCategoryForm.value = false
  newCategoryName.value = ''
}

const handleEdit = (product: Product) => {
  isEditing.value = true
  editingId.value = product.id
  form.value = {
    name: product.name,
    price: product.price,
    image_url: product.image_url,
    description: product.description || '',
    slug: product.slug || '',
    category_id: product.category_id,
    stock: product.stock,
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleDelete = async (id: number) => {
  if (confirm('Are you sure you want to delete this product?')) {
    await deleteProduct(id)
  }
}

const handleAddCategory = async () => {
  const newCategory = await addCategory(newCategoryName.value)
  if (newCategory) {
    form.value.category_id = newCategory.id
    newCategoryName.value = ''
    showNewCategoryForm.value = false
  }
}

const handleSubmit = async () => {
  if (!form.value.category_id) {
    alert('Please select a category')
    return
  }

  const productData: any = {
    name: form.value.name,
    price: form.value.price,
    image_url: form.value.image_url,
    category_id: form.value.category_id,
    stock: form.value.stock,
  }

  // Only add optional fields if they have values
  if (form.value.description) {
    productData.description = form.value.description
  }

  if (isEditing.value && editingId.value) {
    // Include id for update
    const success = await saveProduct({ ...productData, id: editingId.value } as Product, true)
    if (success) resetForm()
  } else {
    // Don't include id for insert
    const success = await saveProduct(productData as Product, false)
    if (success) resetForm()
  }
}

onMounted(() => {
  fetchData()
})
</script>
