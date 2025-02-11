# Assignment 3 - Two-Tier Workout Tracker Web Application with MongoDB, Express, and Passport Authentication 
## Author: Vivek Reddy Kasireddy 

## Project Overview

Welcome to the **Personalized Workout Tracker** web application! This app allows users to log their workouts, view previous workout entries, edit existing data, and manage their fitness progress. It provides a simple and intuitive interface for users to track their fitness goals.

### Live Demo



---

## Features

### 1. **User Authentication**
   - Users can register and log in to the application using their GitHub account via OAuth authentication strategy.
   - For security, we use Passport.js to handle authentication and session management.

### 2. **Workout Logging**
   - Users can add, view, edit, and delete workout entries.
   - On clicking the "Edit" button, the app pre-fills the form with the existing workout data.
   - Once the form is submitted, a PUT request is sent to the server with the updated data, which replaces the original workout entry in the database.
   - The app fetches the updated list of workouts to reflect the changes in the UI.

### 3. **User Testing**
   - The usability of the app was evaluated using the Think-Aloud Protocol with user **Jahnavi Prudhivi**.
   - **Tasks**: Adding and editing workout entries.
   - **Problems Observed**:
     - Users were confused about the "Edit" button and didn’t realize they needed to click it before modifying a workout.
     - Users had difficulty understanding how to save changes after editing.
   - **Surprising Feedback**:
     - One tester suggested adding a confirmation message after editing, which was not initially considered.

---

## Design / UX Achievements

The design of the app follows key principles of usability and accessibility.

### **CRAP Principles (Contrast, Repetition, Alignment, Proximity)**

#### 1. **Contrast**
In my website design, contrast is used strategically to direct the user's attention to the most important elements on each page. For example, the login and registration forms are highlighted with contrasting text and background colors, making them stand out from the rest of the content. On the homepage, the main navigation buttons are given the most emphasis through the use of bold fonts and a distinct color scheme, ensuring they are easily noticeable. The use of contrasting colors between buttons, headings, and background elements helps break up sections visually and guides the user through the different parts of the site. The contrast between text and background, such as white text on a dark background for headings, ensures readability, especially for users with visual impairments. Through these design choices, I was able to maintain a clear hierarchy of information and make the most important content easily accessible at a glance

#### 2. **Repetition**
Repetition is another key principle I utilized throughout my website to create a cohesive and visually appealing design. The consistent use of fonts, colors, and button styles helps the user understand where to look and what actions to take. For instance, I used a single font family throughout the entire site to maintain uniformity, with variations in size for headers, subheaders, and body text to create a clear structure. The primary color palette (a combination of dark and light tones) was used for buttons, links, and navigation bars, ensuring that the site has a unified appearance. Similarly, the same button shape and hover effects were used for all call-to-action buttons, reinforcing their function across different pages. This repetition makes the site feel more organized and easier to navigate, improving the user's experience by reducing the cognitive load and making the interface feel familiar.

#### 3. **Alignment**
Alignment plays a crucial role in ensuring that the content on my website is organized and easy to read. I used consistent alignment for text, buttons, and images to create a clean and balanced layout. For example, all headings are aligned to the left to establish a clear starting point for each section, while the body text is aligned to the left as well to make it easy to follow. The images and icons on the site are also aligned symmetrically with their accompanying text, which helps form a logical flow of information. The use of grid layouts in the registration and login forms ensures that all elements are properly aligned, making the form more user-friendly. By maintaining consistent alignment throughout the site, I created a harmonious visual structure that enhances readability and guides the user through the content.

#### 4. **Proximity**
 Proximity is employed throughout my website to group related elements and improve the organization of information. For instance, the login and registration forms are grouped together, with labels placed close to their respective input fields, making it clear which label corresponds to which field. This proximity helps users navigate forms efficiently without confusion. Additionally, on the homepage, I grouped the navigation links together in a horizontal bar at the top of the page, visually separating them from the main content. On the other hand, elements that are not directly related, such as footer links and the main content area, are spaced out to prevent visual clutter and ensure the user can distinguish between different sections. This use of proximity reduces cognitive load by visually signaling to the user which elements are related and which are separate, improving the overall user experience.

---

## Technical Achievements

### **Custom CSS Styling**
   - I used a basic CSS framework for layout and responsiveness, with custom modifications to align with the design principles of contrast, repetition, and alignment.
   - Custom CSS was written to refine button styles, form layouts, and ensure accessibility standards.

### **Planned Improvements**
   - Add a "Workout updated!" confirmation message after editing to notify users of changes.
   - Rename the "Edit" button to "Modify Workout" for clarity.
   - Implement a loading indicator to show when workout data is being updated.

---

## Accessibility Features

To ensure the web app is accessible, I followed twelve tips from the W3C guidelines:

### **Writing Tips**
1. **Use Descriptive Links**: All links are clear and descriptive, avoiding vague text like "click here."
2. **Provide Text Alternatives for Non-Text Content**: Alt text is added for all images, ensuring screen reader accessibility.
3. **Write in Plain Language**: Content is kept simple and understandable to accommodate users with cognitive disabilities or those for whom English is a second language.

### **Designing Tips**
4. **Ensure Sufficient Color Contrast**: Text has high contrast against the background for readability.
5. **Create Consistent Layouts**: The layout remains consistent throughout the app, ensuring a predictable user experience.
6. **Use Accessible Forms**: Forms have proper labels for all fields, ensuring they are easy to navigate for screen reader users.
7. **Ensure that Content Can Be Resized**: Text can be resized without breaking the layout.
8. **Add Keyboard Navigation**: All interactive elements are accessible via keyboard alone.

### **Development Tips**
9. **Use Semantic HTML Tags**: HTML is structured using semantic tags to improve accessibility.
10. **Provide Accessible Video Content**: If any video content is added, it will include captions or subtitles.
11. **Ensure Proper Heading Structure**: Headings follow a logical hierarchy for easy navigation.
12. **Test for Accessibility Using Tools**: Accessibility testing was performed using WAVE and Axe to ensure compliance.

---

## Authentication Strategy

I used **Passport Local Strategy** for user authentication. This approach was chosen for its simplicity and ease of implementation. It allows users to log in and authenticate using their credentials stored in a database, making the app user-friendly and secure.

---

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Authentication**: Passport.js -> Local Strategy
- **Database**: MongoDB
- **Hosting**: Vercel / Heroku

---

## Future Enhancements

- **Message after edit**: Adding confirmation messages after edits to notify users of successful changes.
- **Improve button clarity**: Renaming buttons for clearer functionality.
- **User profiles**: Adding features to let users create and view personalized workout profiles.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

