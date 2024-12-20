---
layout: post
title: "Physics Engine"
description: "A simple *buggy* 2D physics engine built with JavaScript"
github: "https://github.com/Gooey321/Physics-Engine"
author: Sam
date: 2024-11-4 8:42:12 +1100
---
# Nuclear Tic Tac Toe

A nuclear version of the classic naughts and crosses game.

## Introduction

Nuclear Tic Tac Toe is an enhanced version of the traditional Tic Tac Toe game with an added twist of nuclear bombs. Players can use bombs to clear rows or columns, making the game more strategic and exciting.

## Features

- Classic Tic Tac Toe gameplay
- Nuclear bomb feature to clear rows or columns
- Radioactive cells that cannot be played on for 2 turns
- Visual indicators for radioactive cells
- Game status display
- Reset button to start a new game

## Usage

Open the application and start playing by clicking on a cell. The first player starts as Player X, and the second player is Player 0. Use the bomb buttons to clear rows or columns strategically.

## Rules

1. The game is played on a 3x3 grid.
2. Two players take turns:
    - Player X goes first (marked with 'X')
    - Player O goes second (marked with '0')
3. Standard Moves:
    - Players click empty squares to place their mark (X or 0)
    - Once a square is marked, it cannot be changed
4. Nuclear Bomb Feature:
    - Each player gets 2 "nuclear bombs" per game
    - Player X's remaining bombs are shown at the top with "Player X Bomb (Remaining: X)"
    - Player 0's remaining bombs are shown at the top with "Player 0 Bomb (Remaining: X)"
    - When using a bomb, players must:
        - Choose between clearing a row or column
        - Enter the row/column number (1, 2, or 3)
        - The chosen row/column becomes radioactive for 2 turns
        - Players cannot place marks in radioactive squares
5. Radioactive Squares:
    - Appear red instead of green
    - Cannot be played on while radioactive
    - Return to normal (green) after 2 turns
6. Winning Conditions:
    - Get three marks in a row (horizontal, vertical, or diagonal)
    - Winning squares are highlighted in red
    - Game ends when a player wins or it's a tie
7. Additional Features:
    - A "RESET" button to start a new game
    - Game status is shown below the grid
    - Radioactive squares decay after 2 turns and become playable again