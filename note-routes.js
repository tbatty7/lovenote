import Account from './models/Account';
import Note from './models/Note';
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const app = express();
const router = express.Router();
