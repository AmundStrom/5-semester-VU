Incorporating the peer review feedback, all text within the quotation marks ("") are the comments made by S. Sharma on our code:

HTML CHECKER PROBLEMS & CORRECTIONS: 
1) Removed trailing slash / from: <link rel="stylesheet" type="text/css" href="style.css"> as "link is a void and self-closing element... etc"
2) "Section always requires a heading": h2 was added before every <section> in assignment 2 


W3C WEB CONTENT ACCESSIBILITY GUIDELINES 2.0:
- RULE 1.1. states that every non-textual content should have some kind of textual alternative for say when we use any control or input related tags like     forms ,image tags ,time-based media, decoration:

    As the review said we included the following: "Forms which is a control and accepts user input: In the html code the forms have input fields also have controls which accepts some kind of input and has placeholders explaining the functionalities. Forms also have a submit button which is a control and accepts input and should have some kind of text to explain its functionality. All the images have a figure caption which a short description about what the picture is about. The code does not include anything related to time-based media.It does not include anything related to tests or exercises that could be presented in text-format. No non-textual content which is used to create a sensory experience. No CAPTCHA has been used for to confirm that content is being accessed by a person rather than a computer All the images have a figure caption which a short description about what the picture is about. Decoration, Formatting, Invisible: The html code does use few non-textual content for just decoration however they are not treated in a way that they purely decorative and should be ignored." Since the review didn not give a credible level accession, we believe it our work is level A.

- RULE 1.3. focuses on adaptability which means how to present the content in different ways without actually losing any important information or structure. Also focuses on perceivability on how to present the content to people with disability like it should be accessible by all. Our level was not assessed for this rule either, we think we meet the requirements for success criteria level A.
 
    - 1.3.1 "Info and Relationships: Focuses on how the information , structure and relationships within the content should be presented that can be programmatically determined and are available in text. This means that the code must have a clear markup and textual content like labelling or captions in order to understand the structure. Appropriate html elements have been used like <h1>,<h2>,<nav>,<table>,<ul>,<dl>,<ol>,<section>,<div>." 

    - 1.3.2 "Meaningful Sequence: A proper html structure provides a Meaningful sequence for the content and great work has been in structuring the content. Proper sequence has been implemented." 

    - 1.3.3 "Sensory Characteristics: The guidelines states that it is not the best idea to rely just on sensory characteristics like color, size or orientation .If we avoid focusing a lot on that then the web page will be accessible to people with disabilities as well. However the group is not completely relying on sensory characters . They have nav tools, images which have fig-captions(textual content) making it accessible for people with disabilities. But I would like to mention for the However , the principle 1.3 states that content should be adaptable and have multiple ways of presentation and the group has abided by the guidelines."

- RULE 1.4 distinguishability, focuses on making the web page accessible for people with disabilities in order for them to distinguish between different elements of the content. Our level was not assessed for this rule either, we think we meet the requirements for success criteria level A:

    - 1.4.1: "Use of Color: This means that we should not solely just depend on colors for distinguishing the webpage. Because people with color blindness may not be able to access the webpage. However the group has used color only for styling purposes and have also focused on html markup, images with alt attributes and fig-captions to make the webpage distinguishable."

    - 1.4.2: "Focuses on audio content but not applicable here"

    - 1.4.3: "Contrast: Focuses on the contrast between text or images of text has a contrast of at least 4:5:1. But I don’t think the ratio has been implied here. Sufficient contrast is really necessary to ensure readability".

    - 1.4.4: "Resize text: This property is really useful as it helps people to resize the text on the web up to 200% without loss of content. For this you could use relative measurements like: percentage font sizes, name font size (like larger , smaller) , using em (1.6em) . However % ,larger/smaller, em have not been used."

    - 1.4.5: "Images of text: This guideline says that we should use text instead of images to convey information. However the group has used headings , paragraphs . However images are for decor purposes but they have a alt attribute and fig captions which gives a brief information about the image."

    - 1.4.6: "Contrast (Enhanced):The visual presentation of text and images of text has a contrast ratio of at least 7:1 Not really focused on the contrast ratio between the text and image if text"

    - 1.4.7: "Low or No Background Audio- not applicable here."

    - 1.4.8: "Visual Presentation: It aims to provide customizable options for text colours ,background - colour , text width limits ,text alignment, enough spacing and responsive text sizing. However, background colour has been used, <p> and <h1> is used to create spacing between paragraphs."



- RULE 2 Our level was not assessed for this rule either, we think we meet the requirements for success criteria level A:
    - 2.1: "focuses on keyboard accessibility that the webpage should be accessible using keyboard. I see that this webpage completely abides by the guideline as users can efficiently navigate and interact with the webpage's content using only a keyboard interface All the forms can be filled and submitted easily using keyboard interface by pressing "TAB". Additionally, all links are operable through keyboard navigation.No keyboard trap can be observed and it is observed that the focus on a component can also be shifted using a keyboard. Hence navigating using the keyboard is possible. Importantly, there are no keyboard traps observed, and users can effortlessly shift the focus between components using the keyboard. No time limit has been is observed on the web page making it static and giving the freedom to spend as much time as possible on the webpage. Hence users can pause, and stop wherever necessary."

    -2.4: "Allows users to navigate through the page easily: The webpage has a proper title and nav tags to navigate through the webpage to view the page they want and skip the page they don’t want to see. Heading and labels can be seen in the form and section tag. The purpose of each link is clearly stated by a single text alone. (example <td>Late Registration</td>)."

RESPONSIVENESS, PROBLEMS & FIXES: 
1) "The web page doesn’t look perfect under the size 320 x 480. The table does not fit in the webpage... etc": we insured the web page works proparly for all phones simulations  (across multiple browers like chrome, firefow and safari) in both portrait and landscape mode, our main issue last time was forgetting to include <meta name="viewport" content="width=device-width, initial-scale=1"> in the head of the html file. Fixing that common mistake hence made the implementation of media queries for smaller screens much more effective.
2) Our printing queries works much better as well, it was insured that there is no sudden page breaks in between headings such that the text fits nicely on the page. However we were met with a new challange on this assignment that we managed to overcome, such as: getting rid of the search bar gallery buttns when printing. As those are pretty usles swhen printed on paper. 

NO CORRECTIONS FOR SEMANTIC MARKUP NEEDED: 
"The use of semantic elements have been used properly... etc."

MORE ACTIONABLE FEEDBACK GIVEN & ITS FIXES: 
1) "Form: It's advisable to move the form element outside of the table. Forms are not meant to be placed directly within tables, as it can lead to accessibility and semantic issues. You can place it above or below the table for better code organization and compliance with HTML guideline. The form(<form action="https://webtech.labs.vu.nl/api24/c2cf42e2" method="POST">) can be placed above the table that is above<table id="caption">" This assxµignment no longer has the form contianor. 
2) "Orphans and widows have not been used which are compulsory to use." It was added in this assignment despite not being neccessery. 
 
