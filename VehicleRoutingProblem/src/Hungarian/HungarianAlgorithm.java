//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//
package Hungarian;

import java.util.Arrays;

public class HungarianAlgorithm {
    private double[][] costMatrix;
    private int rows;
    private int cols;
    private int dim;
    private double[] labelByWorker;
    private double[] labelByJob;
    private int[] minSlackWorkerByJob;
    private double[] minSlackValueByJob;
    private int[] matchJobByWorker;
    private int[] matchWorkerByJob;
    private int[] parentWorkerByCommittedJob;
    private boolean[] committedWorkers;

    public HungarianAlgorithm(double[][] costMatrix) {
        this.dim = Math.max(costMatrix.length, costMatrix[0].length);
        this.rows = costMatrix.length;
        this.cols = costMatrix[0].length;
        this.costMatrix = new double[this.dim][this.dim];

        for(int w = 0; w < this.dim; ++w) {
            if (w < costMatrix.length) {
                if (costMatrix[w].length != this.cols) {
                    throw new IllegalArgumentException("Irregular cost matrix");
                }

                this.costMatrix[w] = Arrays.copyOf(costMatrix[w], this.dim);
            } else {
                this.costMatrix[w] = new double[this.dim];
            }
        }

        this.labelByWorker = new double[this.dim];
        this.labelByJob = new double[this.dim];
        this.minSlackWorkerByJob = new int[this.dim];
        this.minSlackValueByJob = new double[this.dim];
        this.committedWorkers = new boolean[this.dim];
        this.parentWorkerByCommittedJob = new int[this.dim];
        this.matchJobByWorker = new int[this.dim];
        Arrays.fill(this.matchJobByWorker, -1);
        this.matchWorkerByJob = new int[this.dim];
        Arrays.fill(this.matchWorkerByJob, -1);
    }

    protected void computeInitialFeasibleSolution() {
        int w;
        for(w = 0; w < this.dim; ++w) {
            this.labelByJob[w] = Double.POSITIVE_INFINITY;
        }

        for(w = 0; w < this.dim; ++w) {
            for(int j = 0; j < this.dim; ++j) {
                if (this.costMatrix[w][j] < this.labelByJob[j]) {
                    this.labelByJob[j] = this.costMatrix[w][j];
                }
            }
        }

    }

    public int[] execute() {
        this.reduce();
        this.computeInitialFeasibleSolution();
        this.greedyMatch();

        int w;
        for(w = this.fetchUnmatchedWorker(); w < this.dim; w = this.fetchUnmatchedWorker()) {
            this.initializePhase(w);
            this.executePhase();
        }

        int[] result = Arrays.copyOf(this.matchJobByWorker, this.rows);

        for(w = 0; w < result.length; ++w) {
            if (result[w] >= this.cols) {
                result[w] = -1;
            }
        }

        return result;
    }

    protected void executePhase() {
        label50:
        while(true) {
            int minSlackWorker = -1;
            int minSlackJob = -1;
            double minSlackValue = Double.POSITIVE_INFINITY;

            int worker;
            for(worker = 0; worker < this.dim; ++worker) {
                if (this.parentWorkerByCommittedJob[worker] == -1 && this.minSlackValueByJob[worker] < minSlackValue) {
                    minSlackValue = this.minSlackValueByJob[worker];
                    minSlackWorker = this.minSlackWorkerByJob[worker];
                    minSlackJob = worker;
                }
            }

            if (minSlackValue > 0.0) {
                this.updateLabeling(minSlackValue);
            }

            this.parentWorkerByCommittedJob[minSlackJob] = minSlackWorker;
            int j;
            if (this.matchWorkerByJob[minSlackJob] != -1) {
                worker = this.matchWorkerByJob[minSlackJob];
                this.committedWorkers[worker] = true;
                j = 0;

                while(true) {
                    if (j >= this.dim) {
                        continue label50;
                    }

                    if (this.parentWorkerByCommittedJob[j] == -1) {
                        double slack = this.costMatrix[worker][j] - this.labelByWorker[worker] - this.labelByJob[j];
                        if (this.minSlackValueByJob[j] > slack) {
                            this.minSlackValueByJob[j] = slack;
                            this.minSlackWorkerByJob[j] = worker;
                        }
                    }

                    ++j;
                }
            }

            worker = minSlackJob;
            j = this.parentWorkerByCommittedJob[minSlackJob];

            while(true) {
                int temp = this.matchJobByWorker[j];
                this.match(j, worker);
                worker = temp;
                if (temp == -1) {
                    return;
                }

                j = this.parentWorkerByCommittedJob[temp];
            }
        }
    }

    protected int fetchUnmatchedWorker() {
        int w;
        for(w = 0; w < this.dim && this.matchJobByWorker[w] != -1; ++w) {
        }

        return w;
    }

    protected void greedyMatch() {
        for(int w = 0; w < this.dim; ++w) {
            for(int j = 0; j < this.dim; ++j) {
                if (this.matchJobByWorker[w] == -1 && this.matchWorkerByJob[j] == -1 && this.costMatrix[w][j] - this.labelByWorker[w] - this.labelByJob[j] == 0.0) {
                    this.match(w, j);
                }
            }
        }

    }

    protected void initializePhase(int w) {
        Arrays.fill(this.committedWorkers, false);
        Arrays.fill(this.parentWorkerByCommittedJob, -1);
        this.committedWorkers[w] = true;

        for(int j = 0; j < this.dim; ++j) {
            this.minSlackValueByJob[j] = this.costMatrix[w][j] - this.labelByWorker[w] - this.labelByJob[j];
            this.minSlackWorkerByJob[j] = w;
        }

    }

    protected void match(int w, int j) {
        this.matchJobByWorker[w] = j;
        this.matchWorkerByJob[j] = w;
    }

    protected void reduce() {
        double[] var10000;
        for(int w = 0; w < this.dim; ++w) {
            double min = Double.POSITIVE_INFINITY;

            int j;
            for(j = 0; j < this.dim; ++j) {
                if (this.costMatrix[w][j] < min) {
                    min = this.costMatrix[w][j];
                }
            }

            for(j = 0; j < this.dim; ++j) {
                var10000 = this.costMatrix[w];
                var10000[j] -= min;
            }
        }

        double[] min = new double[this.dim];

        int w;
        for(w = 0; w < this.dim; ++w) {
            min[w] = Double.POSITIVE_INFINITY;
        }

        int j;
        for(w = 0; w < this.dim; ++w) {
            for(j = 0; j < this.dim; ++j) {
                if (this.costMatrix[w][j] < min[j]) {
                    min[j] = this.costMatrix[w][j];
                }
            }
        }

        for(w = 0; w < this.dim; ++w) {
            for(j = 0; j < this.dim; ++j) {
                var10000 = this.costMatrix[w];
                var10000[j] -= min[j];
            }
        }

    }

    protected void updateLabeling(double slack) {
        double[] var10000;
        int j;
        for(j = 0; j < this.dim; ++j) {
            if (this.committedWorkers[j]) {
                var10000 = this.labelByWorker;
                var10000[j] += slack;
            }
        }

        for(j = 0; j < this.dim; ++j) {
            if (this.parentWorkerByCommittedJob[j] != -1) {
                var10000 = this.labelByJob;
                var10000[j] -= slack;
            } else {
                var10000 = this.minSlackValueByJob;
                var10000[j] -= slack;
            }
        }

    }
}
