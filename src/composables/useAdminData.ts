import { ref, computed } from 'vue'
import { supabase } from '../supabase'

export interface Product {
  id: number
  name: string
  slug?: string
  description?: string
  price: number
  image_url: string
  category_id: number | null
  stock: number
  created_at: string
}

export interface Order {
  id: number
  customer_name: string
  customer_email: string
  total_price: number
  status: string
  created_at: string
}

export interface Category {
  id: number
  name: string
  created_at?: string
}

export interface User {
  id: number | string
  email: string
  full_name?: string
  created_at: string
}

export const useAdminData = () => {
  const loading = ref(false)
  const orders = ref<Order[]>([])
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const users = ref<User[]>([])

  // Fetch all admin data
  const fetchData = async () => {
    loading.value = true
    try {
      const [ord, prod, cat] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name', { ascending: true }),
      ])
      orders.value = ord.data || []
      products.value = prod.data || []
      categories.value = cat.data || []
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      loading.value = false
    }
  }

  // Fetch users
  const fetchUsers = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        const uniqueUsers = orders.value.reduce((acc: any[], order) => {
          const exists = acc.find((u) => u.email === order.customer_email)
          if (!exists && order.customer_email) {
            acc.push({
              id: order.user_id || order.id,
              email: order.customer_email,
              full_name: order.customer_name,
              created_at: order.created_at,
            })
          }
          return acc
        }, [])
        users.value = uniqueUsers
      } else {
        users.value = data || []
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      loading.value = false
    }
  }

  // Calculate stats
  const stats = computed(() => {
    const lowLimit = 5
    const lowCount = products.value.filter((p) => p.stock < lowLimit).length
    return {
      revenue: orders.value.reduce((sum, o) => sum + Number(o.total_price || 0), 0),
      pending: orders.value.filter((o) => o.status === 'pending').length,
      lowStockCount: lowCount,
      health:
        products.value.length > 0
          ? Math.round(((products.value.length - lowCount) / products.value.length) * 100)
          : 100,
    }
  })

  // Get low stock items
  const lowStockItems = computed(() =>
    products.value.filter((p) => p.stock < 5).sort((a, b) => a.stock - b.stock),
  )

  // Get user stats
  const getUserStats = (userEmail: string) => {
    const userOrdersList = orders.value.filter((o) => o.customer_email === userEmail)
    return {
      totalOrders: userOrdersList.length,
      totalSpent: userOrdersList.reduce((sum, o) => sum + Number(o.total_price || 0), 0),
    }
  }

  // Update order status
  const updateOrderStatus = async (id: number, status: string) => {
    try {
      await supabase.from('orders').update({ status }).eq('id', id)
      fetchData()
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  // Add category
  const addCategory = async (categoryName: string) => {
    if (!categoryName.trim()) return null
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ name: categoryName }])
        .select()
        .single()

      if (!error && data) {
        categories.value.push(data)
        return data
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
    return null
  }

  // Delete product
  const deleteProduct = async (id: number) => {
    try {
      await supabase.from('products').delete().eq('id', id)
      fetchData()
    } catch (error) {
      console.error('Error deleting product:', error)
    }
  }

  // Save product (create or update)
  const saveProduct = async (product: Product, isUpdate: boolean = false) => {
    loading.value = true
    try {
      if (isUpdate) {
        const { id, created_at, ...updateData } = product as any
        const { error } = await supabase.from('products').update(updateData).eq('id', product.id)
        if (error) throw error
      } else {
        const { id, created_at, ...insertData } = product as any
        const { error } = await supabase.from('products').insert(insertData)
        if (error) throw error
      }
      await fetchData()
      return true
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product: ' + (error as any).message)
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    loading,
    orders,
    products,
    categories,
    users,

    // Methods
    fetchData,
    fetchUsers,
    updateOrderStatus,
    addCategory,
    deleteProduct,
    saveProduct,

    // Computed
    stats,
    lowStockItems,
    getUserStats,
  }
}
