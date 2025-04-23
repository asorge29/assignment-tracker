import Link from "next/link";

const Page = () => {

  return (<div className="p-4 md:px-[20%]">
      <h1 className="text-6xl">Privacy Policy</h1>
      <p className="my-3"><strong>Effective Date:</strong> April 23, 2025</p>
      <p>
        Thank you for using Assignment Tracker. We take your privacy seriously. This Privacy Policy outlines what data
        we collect, how we use it, and your rights regarding that data.
      </p>

      <h2 className="text-3xl my-3">Information We Collect</h2>
      <p>We collect and store the following information associated with your account:</p>
      <ul className="ml-5 list-outside list-disc">
        <li><strong>Email Address</strong>: Used to associate your classes, assignments, and settings in our database.
        </li>
      </ul>
      <br/>
      <p>We do <strong>not</strong> collect or store any of the following:</p>
      <ul className="ml-5 list-outside list-disc">
        <li>Your name</li>
        <li>Your age</li>
        <li>Your profile picture</li>
        <li>Any other personally identifiable information (PII)</li>
      </ul>
      <br/>
      <p>If you sign in using an OAuth provider (e.g., Google), your name and profile picture may be used <strong>on the
        client side only</strong> to personalize your experience. These are never sent to or stored in our database.</p>

      <h2 className="text-3xl my-3">How We Use Your Information</h2>
      <p>Your email address is used to:</p>
      <ul className="ml-5 list-outside list-disc">
        <li>Associate your data (classes, assignments, settings) with your account</li>
        <li>Authenticate your session via OAuth</li>
        <li>Respond to support or deletion requests</li>
      </ul>

      <h2 className="text-3xl my-3">Data Deletion</h2>
      <p>You can request the permanent deletion of your data at any time by emailing us at&nbsp;
        <a href="mailto:support@assignmenttracker.app" className="underline">support@assignmenttracker.app</a>.
        Upon request, we will remove your email and all associated data from our database.</p>

      <h2 className="text-3xl my-3">Third-Party Services</h2>
      <p>We use third-party authentication providers to let you sign in securely. We do not share your data with any
        other
        third parties.</p>

      <h2 className="text-3xl my-3">Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify users of any significant changes via the
        app or
        email.</p>

      <p>If you have any questions about this Privacy Policy, please contact us at&nbsp;
        <a href="mailto:support@assignmenttracker.app" className="underline">support@assignmenttracker.app</a>.
      </p>
      <Link href="/" className="mt-8 block text-2xl underline">Return Home</Link>
    </div>
  )
}

export default Page;