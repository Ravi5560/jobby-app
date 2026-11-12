import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsBoxArrowUpRight, BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const token = Cookies.get('jwt_token')

    const {match} = this.props
    const {id} = match.params

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    const data = await response.json()

    const updatedJobDetails = {
      id: data.job_details.id,
      title: data.job_details.title,
      companyLogoUrl: data.job_details.company_logo_url,
      companyWebsiteUrl: data.job_details.company_website_url,
      employmentType: data.job_details.employment_type,
      packagePerAnnum: data.job_details.package_per_annum,
      location: data.job_details.location,
      rating: data.job_details.rating,
      jobDescription: data.job_details.job_description,
      skills: data.job_details.skills,
      lifeAtCompany: data.job_details.life_at_company,
    }

    const updatedSimilarJobs = data.similar_jobs.map(each => ({
      id: each.id,
      title: each.title,
      companyLogoUrl: each.company_logo_url,
      employmentType: each.employment_type,
      location: each.location,
      rating: each.rating,
      jobDescription: each.job_description,
    }))

    this.setState({
      jobDetails: updatedJobDetails,
      similarJobs: updatedSimilarJobs,
      isLoading: false,
    })
  }

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state

    const {
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      packagePerAnnum,
      location,
      rating,
      jobDescription,
      skills,
      lifeAtCompany,
    } = jobDetails

    return (
      <div className="job-item-bg-container">
        <div className="job-item-card">
          <div className="title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />

            <div>
              <h1 className="job-title">{title}</h1>

              <div className="rating-container">
                <BsStarFill className="star-icon" />

                <p>{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-package-container">
            <div className="location-employment-container">
              <div className="icon-text">
                <MdLocationOn />

                <p>{location}</p>
              </div>

              <div className="icon-text">
                <BsBriefcaseFill />

                <p>{employmentType}</p>
              </div>
            </div>

            <p>{packagePerAnnum}</p>
          </div>

          <hr className="line" />

          <div className="description-visit-container">
            <h1>Description</h1>

            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
              className="visit-link"
            >
              Visit
              <BsBoxArrowUpRight className="visit-icon" />
            </a>
          </div>

          <p className="description">{jobDescription}</p>

          <h1 className="skills-heading">Skills</h1>

          <ul className="skills-list">
            {skills.map(each => (
              <li className="skill-item" key={each.name}>
                <img
                  src={each.image_url}
                  alt={each.name}
                  className="skill-image"
                />

                <p>{each.name}</p>
              </li>
            ))}
          </ul>

          <h1 className="life-heading">Life at Company</h1>

          <div className="life-container">
            <p className="life-description">{lifeAtCompany.description}</p>

            <img
              src={lifeAtCompany.image_url}
              alt="life at company"
              className="life-image"
            />
          </div>
        </div>

        <h1 className="similar-heading">Similar Jobs</h1>

        <ul className="similar-jobs-list">
          {similarJobs.map(each => (
            <SimilarJobCard key={each.id} details={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        <Header />

        {isLoading ? (
          <div className="loader-container" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          this.renderJobDetails()
        )}
      </>
    )
  }
}

export default JobItemDetails
