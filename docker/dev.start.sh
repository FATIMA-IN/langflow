#!/bin/bash

cd src/frontend && npm run dev:docker &
make backend
