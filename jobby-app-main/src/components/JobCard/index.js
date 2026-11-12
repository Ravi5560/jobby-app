import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobDetails} = props

  const {
    id,
    title,
    rating,
    companyLogoUrl,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-card">
        <div className="title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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

        <h1 className="description-heading">Description</h1>

        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
