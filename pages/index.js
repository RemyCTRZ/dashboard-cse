import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Dashboard from '../components/Dashboard'
import { useState, useEffect } from 'react'
import ValidateUsers from '../components/ValidateUsers'
import UsersList from '../components/UsersList'
import { apiService } from '../services/APIService'
import Login from '../components/Login'

export default function DashboardAdmin() {

  const [dashboardWindow, setDashboardWindow] = useState({
    dashboard: true,
    validateUsers: false,
    usersList: false,
    candidatesList: false,
    companiesList: false,
  })

  const [users, setUsers] = useState([])

  const [candidates, setCandidates] = useState([])

  const [companies, setCompanies] = useState([])

  const [monitorChange, setMonitorChange] = useState(false)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    apiService.get('users').then(response => setUsers(response.data))
    apiService.get('candidates').then(response => setCandidates(response.data))
    apiService.get('companies').then(response => setCompanies(response.data))
  }, [dashboardWindow, monitorChange])


  const switchToDashboard = () => {
    setDashboardWindow({
      dashboard: true,
      validateUsers: false,
      usersList: false,
      candidatesList: false,
      companiesList: false,
    })
  }

  const switchToValidateUsers = () => {
    setDashboardWindow({
      dashboard: false,
      validateUsers: true,
      usersList: false,
      candidatesList: false,
      companiesList: false,
    })
  }

  const switchToUsersList = () => {
    setDashboardWindow({
      dashboard: false,
      validateUsers: false,
      usersList: true,
      candidatesList: false,
      companiesList: false,
    })
  }

  const switchToCandidatesList = () => {
    setDashboardWindow({
      dashboard: false,
      validateUsers: false,
      usersList: false,
      candidatesList: true,
      companiesList: false,
    })
  }

  const switchToCompaniesList = () => {
    setDashboardWindow({
      dashboard: false,
      validateUsers: false,
      usersList: false,
      candidatesList: false,
      companiesList: true,
    })
  }

  const user = {
    name: "Rémy",
    role: "Super Administrateur",
    isConnected: true,
  }

  return (
    <>
      <Head>
        <title className={styles.title}>Dashboard - CSE</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isConnected ? (
        <>
          <Header
            user={user}
          />
          <main className={styles.main}>
            <Navbar
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              switchToDashboard={switchToDashboard}
              switchToValidateUsers={switchToValidateUsers}
              switchToUsersList={switchToUsersList}
              switchToCandidatesList={switchToCandidatesList}
              switchToCompaniesList={switchToCompaniesList}
            />
            {dashboardWindow.dashboard ? (
              <Dashboard companies={companies} candidates={candidates} users={users} />) : ('')}
            {dashboardWindow.validateUsers ? (<ValidateUsers companies={companies} candidates={candidates} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />) : ('')}
            {dashboardWindow.usersList ? (<UsersList users={users} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />) : ('')}
            {dashboardWindow.candidatesList ? (<UsersList candidates={candidates} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />) : ('')}
            {dashboardWindow.companiesList ? (<UsersList companies={companies} setMonitorChange={setMonitorChange} monitorChange={monitorChange} />) : ('')}
          </main>
        </>
      ) : (
        <Login setIsConnected={setIsConnected} isConnected={isConnected} />
      )}
    </>
  )
}