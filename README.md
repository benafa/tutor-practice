# Tutor Practice

A prototype that helps tutors give each student a personalized experience between lessons. A tutor adds a lesson, chooses what the student should practise, and sends the student their own practice page.

- `index.html`: the tutor flow (add a lesson, review cards, send, see results)
- `student.html`: the student's practice page
- `lesson.js`: one prepared sample lesson
- `audio/`: recorded clips for that lesson, in male and female voices

## How it works today

There is no server yet. The tutor's choices travel in the student's link. Practice results are saved in the browser, so the tutor only sees them if the student page was opened in the same browser. The upload step is simulated and always loads the sample lesson.

Run it locally with any static file server, then open it in a browser:

```bash
python3 -m http.server 8000
```
