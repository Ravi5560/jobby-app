import './index.css'

const SimilarJobCard = props => {
  const {details} = props

  const {
    title,
    companyLogoUrl,
    jobDescription,
    employmentType,
    location,
    rating,
  } = details

  return (
    <li className="similar-job-card">
      <div className="title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-logo"
        />

        <div>
          <h1 className="similar-title">{title}</h1>

          <p>{rating}</p>
        </div>
      </div>

      <h1>Description</h1>

      <p>{jobDescription}</p>

      <div className="location-employment-container">
        <p>{location}</p>

        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobCard
