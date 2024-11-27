'use client'

import React, { useState, useEffect, useCallback } from "react"
import { createIcons, icons } from "lucide"
import NavigationSide from "@/components/common/navigatin-side-top/NavigationSide"
import NavigationTop from "@/components/common/navigatin-side-top/NavigationTop"
import AccountsTable from "@/components/common/tables/accountsTable"
import { Filter, Search, RefreshCw, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DeleteModal from "@/components/ui/deletemodal"
import { useAccountContext } from "@/context/contexts"
import DashboardRegistrationForm from "@/components/common/login-form/RegistrationForm"
import { useRegistrationContext } from "@/context/utilContext"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function AdminAccounts({ sidebarOpen = false, toggleSidebar = () => {} }) {
  const { accountData, fetchAccountData } = useAccountContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    role: "all",
    status: "all"
  })
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [accountToDelete, setAccountToDelete] = useState(null)
  const [isAddAccountSidebarOpen, setIsAddAccountSidebarOpen] = useState(false)
  const { renders, setRenderers } = useRegistrationContext()
  const [tableKey, setTableKey] = useState(0)

  useEffect(() => {
    createIcons({ icons })
  }, [])

  const fetchAccountDataCallback = useCallback(async () => {
    await fetchAccountData()
    setTableKey(prevKey => prevKey + 1)
  }, [fetchAccountData])

  useEffect(() => {
    fetchAccountDataCallback()
    setIsAddAccountSidebarOpen(false)
  }, [renders])

  const filteredAccounts = accountData
    ? accountData.filter((account) => {
        const matchesSearch =
          account.account_fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.account_lName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          account.account_email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesRole =
          filters.role === "all" || account.account_role === filters.role
        const matchesStatus =
          filters.status === "all" || account.account_status === filters.status

        return matchesSearch && matchesRole && matchesStatus
      })
    : []


  const handleDelete = (account) => {
    setAccountToDelete(account)
    setDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    console.log(`Deleting account for ${accountToDelete.account_fName} ${accountToDelete.account_lName}`)
    setDeleteModalOpen(false)
    setAccountToDelete(null)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }))
  }

  const resetFilters = () => {
    setFilters({
      role: "all",
      status: "all"
    })
    setSearchTerm("")
  }

  const roles = accountData ? [...new Set(accountData.map(a => a.account_role))] : []
  const statuses = accountData ? [...new Set(accountData.map(a => a.account_status))] : []

  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "all")

  return (
    <div className="flex flex-row overflow-hidden relative w-screen h-screen bg-gray-100">
      <NavigationSide isOpen={sidebarOpen} />

      <div className="flex-1 overflow-auto">
        <NavigationTop onSidebarToggle={toggleSidebar} />

        <main className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Accounts</h1>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-transparent rounded-lg focus:outline-none focus:border-blue-500"
                />
                <div className="absolute inset-y-0 left-2 flex items-center pointer-events-none">
                  <Search className="text-gray-900" size={18} />
                </div>
              </div>
              <Select value={filters.role} onValueChange={(value) => handleFilterChange('role', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setIsAddAccountSidebarOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
              {(activeFilters.length > 0 || searchTerm) && (
                <Button
                  variant="ghost"
                  onClick={resetFilters}
                  title="Reset all filters"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {activeFilters.map(([key, value]) => (
                <Badge key={key} variant="secondary">
                  {value}
                </Badge>
              ))}
            </div>
          )}
          <div>
            <AccountsTable
              key={tableKey}
              accounts={filteredAccounts}
              onDelete={handleDelete}
            />
          </div>
        </main>

        {isAddAccountSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsAddAccountSidebarOpen(false)}
          ></div>
        )}

        <div
          className={`fixed inset-y-0 right-0 w-[500px] bg-white shadow-lg transform ${
            isAddAccountSidebarOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out overflow-y-auto z-50`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setIsAddAccountSidebarOpen(false)}
                className="absolute top-1 right-[440px]"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <DashboardRegistrationForm />
          </div>
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={accountToDelete ? `${accountToDelete.account_fName} ${accountToDelete.account_lName}` : ''}
        itemType="Account"
      />
    </div>
  )
}

