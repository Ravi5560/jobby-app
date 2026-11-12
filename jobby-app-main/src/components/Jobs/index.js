import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Profile from '../Profile'
import JobCard from '../JobCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: {},
    jobsList: [],
    searchInput: '',
    employmentType: [],
    minimumPackage: '',
    profileLoading: true,
    jobsLoading: true,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }

    this.setState({
      profileDetails: updatedData,
      profileLoading: false,
    })
  }

  getJobs = async () => {
    const {searchInput, employmentType, minimumPackage} = this.state

    const token = Cookies.get('jwt_token')

    const employment = employmentType.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${minimumPackage}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()

    const updatedData = data.jobs.map(each => ({
      id: each.id,
      title: each.title,
      rating: each.rating,
      companyLogoUrl: each.company_logo_url,
      location: each.location,
      employmentType: each.employment_type,
      packagePerAnnum: each.package_per_annum,
      jobDescription: each.job_description,
    }))

    this.setState({
      jobsList: updatedData,
      jobsLoading: false,
    })
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.setState({jobsLoading: true}, this.getJobs)
  }

  onChangeEmployment = event => {
    const {employmentType} = this.state

    if (event.target.checked) {
      this.setState(
        {
          employmentType: [...employmentType, event.target.value],
        },
        this.getJobs,
      )
    }
  }

  onChangeSalary = event => {
    this.setState(
      {
        minimumPackage: event.target.value,
      },
      this.getJobs,
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-image"
          />

          <h1>No Jobs Found</h1>

          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    }

    return (
      <ul className="jobs-list">
        {jobsList.map(each => (
          <JobCard key={each.id} jobDetails={each} />
        ))}
      </ul>
    )
  }

  render() {
    const {
      profileDetails,
      profileLoading,
      jobsLoading,
      searchInput,
    } = this.state
    return (
      <>
        <Header />

        <div className="jobs-container">
          <div className="filters-section">
            <div className="search-container">
              <input
                type="search"
                value={searchInput}
                className="search-input"
                placeholder="Search"
                onChange={this.onChangeSearch}
              />

              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickSearch}
              >
                <BsSearch />
              </button>
            </div>

            {profileLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              <Profile profileDetails={profileDetails} />
            )}

            <hr className="line" />

            <h1 className="filter-heading">Type of Employment</h1>

            <ul className="filter-list">
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={each.employmentTypeId}
                    value={each.employmentTypeId}
                    onChange={this.onChangeEmployment}
                  />

                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                </li>
              ))}
            </ul>

            <hr className="line" />

            <h1 className="filter-heading">Salary Range</h1>

            <ul className="filter-list">
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId}>
                  <input
                    type="radio"
                    id={each.salaryRangeId}
                    value={each.salaryRangeId}
                    name="salary"
                    onChange={this.onChangeSalary}
                  />

                  <label htmlFor={each.salaryRangeId}>{each.label}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="jobs-section">
            {jobsLoading ? (
              <div className="loader-container" data-testid="loader">
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            ) : (
              this.renderJobsList()
            )}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
