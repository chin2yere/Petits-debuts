# Petits-debuts

# Overview

# Category: E-commerce

# Story:

It is a hard fact that most of the successful businesses we know and love today, started as on-campus business ideas. Several merchandise spanning major industries were mere ideas, ignited in the hearts of college students including software giants like Facebook, Google, Reddit, etc. However, the hurdles that these businesses have to overcome to simply exist on campuses are unnecessarily enormous. A mere look at the concept of these businesses on the surface level, and one would almost miss these hurdles, but if we are introduced to this concept from the point of view of a business owner, or a customer, we get to see the difficult side of successfully running these businesses.
I was fortunate enough to stumble on this side when I helped my friend manage her business last year; she was away at a conference. It was surprising how many issues they face.

1. Communication- The business-customer communication is scattered across several platforms. Because the businesses are trying to make themselves known, they utilize frequently visited platforms like Instagram, Facebook, Twitter, Snapchat, WhatsApp, GroupMe, etc. In return they are contacted by potential customers across these platforms. It gets especially challenging to keep track of conversations when they are not consolidated into one app.

2. Business-customer Proximity- Typically, a college student goes through their entire college life without knowing of the existence of a business that could have made their lives easier. Students usually hear about businesses through referrals or word of mouth. What happens to the students who do not typically move with the larger group? It is very difficult to reach potential customers unless they specifically come looking for you.

3. Advertisement and review system- Advertisement is very hard. People typically print flyers and paste them all around campus but these flyers either get ignored or taken down by school authorities. During the process of helping my friend run her business, I was kicked out of a GroupMe for trying to advertise her business online. People slide into the DMs of their peers to advertise themselves too, but this process is tiring and unnecessary. Also, there are some students who feed off reviews, be it spoken, or digital. The world has gotten so familiar with a rating system that most people choose not to operate without it. There is no way to rate campus businesses.

4. Double booking - In businesses that entail a service to be booked (for example hair and nails businesses), there is always a double booking problem. Two customers can request that service for the same time period, and it gets confusing for the business to find their way around that.

5. Accountability- it is very easy to cheat the businesses. Many of them do not operate on a contract basis, and as such, there have been several cases of people refusing to pay or finding other ways to defraud the business without being held accountable.

6. Expansion - On-camps businesses almost never expand. Firstly, there is no access to investors who could give them the financial wings to fly. A few businesses have tried to expand by joining popular e-commerce platforms, but they were met with membership fees, minimum product quotas and overshadowing, by already established businesses. Also, people with unconventional services that do not require a product like tutoring services, hair braiding and nail art, could not find a friendly e-commerce platform that would cater to their needs.
   With these hurdles, imagine the number of potential businesses that have perished, and did not make it to the real business world. We have possibly lost out on a number of business giants in our generation.

# Market: College students and smaller communities

# Habit: Daily

# Required

1. Users can login
2. Users can create account
3. Users can create business account
4. The app should be able to pull data from a database and display a business by their name, cover photos and average prices.
5. There they will be able to like products and add products to their cart/ schedule a service depending on the business type
6. Users can search for businesses or filter the suggested businesses based on location or other categories
7. Users will be able to view their recent purchases
8. A business owner will be able to switch mode to a customer and vice versa

Optional

1. Users will have the ability to topup points at will.
2. Users will be prevented from scheduling an impromptu assignment
3. Appointment availability will be strictly based on the business owner's preference
4. User's can like/dislike a product, and the database will be updated in real time.
5. User's are prevented from hoarding time slots. Appointments are only scheduled upon payment.
6. Advertisement videos/gifs will be displayed on the homepage
7. There will be a map feature for service based businesses
8. Business owners can collaborate

User Stories

1. As a nail technician, I want to be able to showcase my work in the form of advertisements so that I can earn more customers.
2. As a food vendor, I want to be able to take pre-orders, so that I don't waste excess food.
3. As a student, I want to be able to view past reviews and ratings, so that I can be more informed before making a decision
4. As a customer, I want to be able to see top trending businesses
5. As a student, I want an easier mode of paying for goods and services (e.g. CashApp), so that I am more motivated to spend
6. As a hairstylist, I want to be able to chat with my customers pre-appointment, so that I can lay down my rules for the appointment
7. As a tutor, I want my availability to be updated as new appointments are made so that I don't run into the issue of double booking
8. As a student, I want the Identity of business owners to be confirmed, so that I feel safe
9. As a non-tech expert, I want the user interface to involve the use of traditional icons, so that I know what to do.
10. As a blind person, I want there to be a text to speech converter, so that I can navigate the website

## Technical Challenges

# Technical Challenge #1

# What

The homepage will be a combination of different Api’s that will generate suggestions based on trending stores/deals, recent purchases, and location.

We have five pillars for measuring a products recommmendability

1. Recent- if the product is in the top 50% of the user's recent purchases, award 15%
   if the product is in bottom 50% award 10%
   if not, award 0

2. Location- if the product is in the same location, award 20%, if not, award 0

3. cart- if the product is in the user's cart, award 25% , if not, award 0

4. Others- we go through the entire cart and order database. If 30% of distinct users have it , award 20%, if 20% of distinct users have it, award 15%, if 10% of distinct users have it, award 10%

5. Likes- if the product is in the user likes, award 40 (i made it 40 instead of 20 to make the like feature a strong determinant like you requested)

there are exemptions: if either, or both of the cart, or user's orders is empty, calculate the score normally, and scale up to hundred.

# Technical Challenge #2

# What

There will be a payment functionality that will allow users to pay for goods/services; There will also be a receipt that will be generated per transaction, and it will be sent to the user’s email.

For my technical challenge 2, I am implementing payment functionality.
I originally planned to use mastercard Apis but I was discouraged due to the rigidity of the api. I wanted an api package that would not rely solely on credit/debit card info. I preferred a method that will enable a user to pay using already established payments methods in industry today.
I settled on paypal because the process of learning to use the api was not as difficult as the others.
For this challenge, I mirrored a typical checkout system as displayed by amazon, etsy, etc, and ensured that payment is only confirmed after the payment process is successful, with correct payment details and sufficient funds.

The second part of the technical challenge required me to use sendgrid to send payment confirmation emails to the customer after payment

The third part of the challenge requires me to use node-cron to send scheduled reminders.

Each time, there will be an api call to my orders table on my database. The code will specifically look for appointments and ignore the typical product orders. After that, all appointments will be categorized into 3 past appointments, current appointments, future appointments. past appointments will be ignored, for current appointments, and email will be sent out: You are currently on your … appointment with …, Please reach out if you have any difficulties. For future appointments, an email will be sent out: This is an email reminder for your appointment … with … at … on ….
