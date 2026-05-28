import "./SellGuide.css";
import { Link } from "react-router-dom";
import sellingCar from "../../assets/SellingCar.png";
import Takingphoto from "../../assets/takingphoto.jpg";
import Key from "../../assets/key.jpg";
function SellGuide() {
  return (
    <main className="article-page">
      <div className="article-container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/sell">Sell</Link>
          <span>›</span>
          <span>How to Sell Your Car</span>
        </div>

        <article className="article-content">
          <h1>
            How to Sell Your Car Privately: 5 Tips to Simplify the Process
          </h1>

          <div className="article-meta">
            <img src="/profile.jpg" alt="Veloce" />
            <div>
              <strong>By Veloce Editors</strong>
              <p>Updated May 2026</p>
            </div>
          </div>

          <img
            className="hero-image"
            src={sellingCar}
            alt="Selling a car privately"
          />

          <p className="caption">
            Selling privately can help you control the price, choose the buyer
            and manage the process on your own terms.
          </p>

          <section className="key-points">
            <h2>Key Points</h2>
            <ul>
              <li>
                Start by understanding your car’s value before setting a price.
              </li>
              <li>
                Create a complete listing with strong photos and honest details.
              </li>
              <li>Prepare paperwork before meeting serious buyers.</li>
              <li>Prioritize safety during test drives and payment.</li>
              <li>
                Finish the sale by transferring ownership and saving records.
              </li>
            </ul>
          </section>

          <section>
            <h2>1. Determine Your Car’s Value</h2>

            <p>
              Many factors{" "}
              <span className="highlight">influence a car’s value</span>. A
              vehicle’s age, mileage and condition are important, but external
              variables like market demand, fuel prices, brand reputation and
              local availability also play a role.
            </p>

            <p>
              Before setting a price, look at similar vehicles currently listed
              in your area. Compare the same make, model, year, trim, mileage
              and condition. If your car has lower mileage or better service
              history than others, you may be able to price it slightly higher.
            </p>

            <p>
              Be realistic with your asking price. A price that is too high may
              make buyers ignore your listing, while a price that is too low may
              cause you to lose money. The best approach is to choose a fair
              price and leave a little room for negotiation.
            </p>
          </section>

          <section>
            <h2>2. Create an Ad to Connect With Shoppers</h2>

            <img
              className="hero-image"
              src={Takingphoto}
              alt="Taking photos of a car"
            />
            <p className="caption">
              Clear photos help buyers understand the car before contacting you.
            </p>

            <p>
              Next, you’ll need to advertise your vehicle to potential buyers.
              First, <span className="highlight">photograph the car</span> and
              create a detailed listing. Take photos during the day, clean the
              car first and show the exterior, interior, wheels, dashboard,
              trunk and any visible damage.
            </p>

            <p>
              In the description, include the year, make, model, trim, mileage,
              fuel type, transmission, ownership history and service records.
              Mention important features such as navigation, leather seats,
              backup camera, safety technology or recent repairs.
            </p>

            <p>
              Once your ad is live, communicate with buyers through messages and
              phone calls. Use this time to screen shoppers and watch for{" "}
              <span className="highlight">red flags</span>, such as buyers who
              avoid direct communication, rush the process or make unusual
              payment requests.
            </p>

            <p>
              Be honest about the condition. Buyers do not expect a used car to
              be perfect, but they do expect the listing to match what they see
              in person.
            </p>
          </section>

          <section>
            <h2>3. Get the Paperwork Ready</h2>

            <p>
              Selling privately takes more preparation than trading in to a
              dealership. You’ll need the{" "}
              <span className="highlight">key documents</span>, including the
              vehicle title, bill of sale, registration papers, inspection
              documents and service records.
            </p>

            <p>
              The bill of sale is useful because it records the transaction,
              including buyer and seller information, vehicle details, sale
              price and date of sale. In some places, this document may be
              required to complete the transfer.
            </p>

            <p>
              If you still{" "}
              <span className="highlight">owe money on the vehicle</span>,
              contact your lender before selling. The lender may hold the title,
              and you will need payoff instructions before transferring
              ownership to the buyer.
            </p>

            <p>
              While not always required, collecting extra documents like a{" "}
              <span className="highlight">vehicle history report</span>,
              maintenance receipts, warranty information and recent repair
              invoices can make your car more desirable and help buyers feel
              more confident.
            </p>
          </section>

          <section>
            <h2>4. Sell It Safely: Test Drives and Payment</h2>

            <p>
              Selling privately means meeting people you do not know, so safety
              should be a priority. Arrange meetings in public places,
              preferably during daylight, and bring a friend or family member if
              possible.
            </p>

            <p>
              When setting up a <span className="highlight">test drive</span>,
              ask to see the buyer’s driving license before handing over the
              keys. Stay with the buyer during the drive and avoid letting
              anyone take the vehicle alone.
            </p>

            <img className="hero-image" src={Key} alt="Handing over car keys" />

            <p className="caption">
              Confirm payment before handing over keys or ownership documents.
            </p>

            <p>
              Payment is another important part of the process. Avoid suspicious
              payment methods, overpayment scams or buyers who want to complete
              the deal without proper verification. Do not release the vehicle
              until payment has cleared.
            </p>

            <p>
              If the buyer wants an inspection, choose a trusted mechanic or
              service center. A pre-purchase inspection is normal, but the
              process should still be clear, safe and agreed by both sides.
            </p>
          </section>

          <section>
            <h2>5. Tie Up Loose Ends</h2>

            <p>
              Once you have an acceptable offer, make sure the final steps are
              completed carefully. Remove your personal items, delete saved
              addresses or phone connections from the infotainment system and
              prepare all keys, manuals and accessories for the buyer.
            </p>

            <p>
              Complete the ownership transfer according to local rules.
              Depending on where you live, you may need to submit a notice of
              sale, remove license plates, cancel registration or notify the
              vehicle office that the car has been sold.
            </p>

            <p>
              After the sale is finished, contact your insurance company and ask
              for the sold vehicle to be removed from your policy. Keep copies
              of the bill of sale, payment confirmation and ownership transfer
              documents for your records.
            </p>

            <p>
              Taking time to finish these final tasks protects you after the
              sale and helps avoid future problems with tickets, insurance or
              vehicle ownership.
            </p>
          </section>

          <div className="article-cta">
            <h2>Ready to sell your car?</h2>
            <p>
              Start with your plate or VIN and create a listing in just a few
              minutes.
            </p>
            <Link to="/sell" state={{ scrollToTop: true }}>
              Sell My Car
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}

export default SellGuide;
