# Quiet Quest


## Git Cloning Project:
1. Open your terminal
2. If you are in Desktop directory, do:

```jsx
git clone https://github.com/simone-lofaso/quiet-quest.git
```

If you already created a folder make sure it's labeled differently from quiet-quest so that you don't get confused later.

3. Open vs code 

```jsx
code .
```

4. In VS Code, open a new terminal but before typing anything into the terminal, make sure you're in the Sprout folder

```jsx
cd quiet-quest
```

5. once you're in the Sprout folder, in the terminal input:

```jsx
npm i
```
6. Run the expo project

```jsx
npx expo start
```

7. In terminal once expo is running type "w" so it opens in the web browser.

## How to Merge:

1. Switch to Main Branch
```
git checkout main
```

2. Update Main
- May need to do npm install
```
git fetch origin
git pull origin main
```

3. Merge the Branch you want into Main
- Replace '<branch-name>' with the branch you want to merge
```
git merge <branch-name>
```

4. Push to main
```
git add .
git commit -m "add comment"
git push
```

5. Ensure all team members have pulled the most recent code in main, or else it can result in errors.

6. Create new branch you want to work on with the new updated main.

## Logo Inspiration:

- Gained inspiration from [Pillow Lab](https://www.vistaprint.com/logomaker/ideas/pillow-logos)